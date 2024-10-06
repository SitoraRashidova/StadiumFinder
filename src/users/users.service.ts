import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { MailService } from "../mail/mail.service";
import { log } from "console";
import { UserGuard } from "../guards/user.guard";
import { PhoneUserDto } from "./dto/phone-user.dto";
import * as otpGenerator from "otp-generator";
import { BotService } from "../bot/bot.service";
import { Otp } from "../otp/otp.model";
import { AddMinutesToDate } from "../helpers/addMinutes";
import { timestamp } from "rxjs";
import { decode, encode } from "../helpers/crypto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Otp) private otpModel: typeof Otp,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly botService: BotService
  ) {}

  //tokenlarni assinxron qilish

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }

  async signUp(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });
    //===========user borligini tekshirish
    if (user) {
      throw new BadRequestException("Bunday fordalanuvchi mavjud");
    }
    //========parol tekshirish

    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    //======hashed_password

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);

    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
    });
    const tokens = await this.generateTokens(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = uuid.v4();
    const updatedUser = await this.userModel.update(
      {
        hashed_refresh_token,
        activation_link,
      },
      {
        where: { id: newUser.id },
        returning: true,
      }
    );
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });
    try {
      await this.mailService.sendMail(updatedUser[1][0]);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("xat yuborish xatolik");
    }

    //responni taxlash

    const respones = {
      message: "User registered",
      user: updatedUser[1][0],
      access_token: tokens.access_token,
    };
    return respones;
  }

  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const isSend = await this.botService.sendOTP(phone_number, otp);
    if (!isSend) {
      throw new BadRequestException("Please, regiter the bot");
    }
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    console.log(expiration_time);

    await this.otpModel.destroy({ where: { phone_number } });
    console.log("test");

    const newOtp = await this.otpModel.create({
      id: uuid.v4(),
      otp,
      expiration_time,
      phone_number,
    });
    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtp.id,
    };
    const encodedData = await encode(JSON.stringify(details));

    return { message: "OTP has been sent ot Telegram", details: encodedData };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verification_key, otp, phone_number } = verifyOtpDto;
    const currentDate = new Date();
    console.log(verification_key);

    const decodedData = await decode(verification_key);
    const details = JSON.parse(decodedData);
    if (details.phone_number != phone_number) {
      throw new BadRequestException("OTP was not sent to this phone number.");
    }
    const resultOtp = await this.otpModel.findOne({
      where: { id: details.otp_id },
    });
    if (!resultOtp) {
      throw new BadRequestException("Not exist such OTP");
    }
    if (resultOtp.verified) {
      throw new BadRequestException("This OTP is already checked!");
    }
    if (resultOtp.expiration_time < currentDate) {
      throw new BadRequestException("OTP time is expired!");
    }
    if (resultOtp.otp != otp) {
      throw new BadRequestException("OTP is not matched!");
    }
    const user = await this.userModel.update(
      { is_owner: true },
      { where: { phone: phone_number }, returning: true }
    );
    console.log(user[1][0].phone, "@", phone_number);
    if (!user[1][0]) {
      throw new BadRequestException("Not exist such user");
    }
    await this.otpModel.update(
      {
        verified: true,
      },
      {
        where: { id: details.otp_id },
      }
    );
    const response = {
      message: "Now, you are owner!",
      owner: user[1][0].is_owner,
    };
    return response;
  }

  // async signin(createUserDto: CreateUserDto, res: Response) {
  //   try {
  //     const { full_name, password } = createUserDto;
  //     const user = await this.userModel.findOne({ where: { full_name } });
  //     if (!user) {
  //       throw new BadRequestException("full_name or password incorrect");
  //     }
  //     const is_valid_password = await bcrypt.compare(
  //       password,
  //       user.hashed_password
  //     );
  //     if (!is_valid_password) {
  //       throw new BadRequestException("username or password incorrect");
  //     }

  //     const tokens = await this.generateTokens(user);

  //     const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
  //     const hashed_refresh_token = await bcrypt.hash(
  //       tokens.refresh_token,
  //       saltRounds
  //     );

  //     await this.userModel.update(
  //       {
  //         hashed_refresh_token,
  //       },
  //       {
  //         where: { id: user.id },
  //       }
  //     );

  //     res.cookie("refresh_token", tokens.refresh_token, {
  //       httpOnly: true,
  //       maxAge:
  //         parseInt(process.env.REFRESH_TIME_MS) || 7 * 24 * 60 * 60 * 1000,
  //     });

  //     return {
  //       message: "Success",
  //       access_token: tokens.access_token,
  //     };
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async activateAccount(activationLink: string) {

  //   const user = await this.userModel.findOne({
  //     where: { activation_link: activationLink },
  //   });
  //   if (!user) {
  //     throw new BadRequestException("Noto'g'ri aktivatsiya linki");
  //   }

  //   if (user.is_active) {
  //     throw new BadRequestException(
  //       "Foydalanuvchi allaqachon aktivlashtirilgan"
  //     );
  //   }

  //   user.is_active = true;
  //   user.activation_link = null;
  //   await user.save();

  //   return {
  //     message: "Hisobingiz muvaffaqiyatli aktivlashtirildi",
  //   };
  // }

  create(createUserDto: CreateUserDto) {
    return `This action returns create users`;
  }
  @UseGuards(UserGuard)
  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
