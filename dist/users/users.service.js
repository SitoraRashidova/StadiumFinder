"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./models/user.model");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../mail/mail.service");
const user_guard_1 = require("../guards/user.guard");
const otpGenerator = require("otp-generator");
const bot_service_1 = require("../bot/bot.service");
const otp_model_1 = require("../otp/otp.model");
const addMinutes_1 = require("../helpers/addMinutes");
const crypto_1 = require("../helpers/crypto");
let UsersService = class UsersService {
    constructor(userModel, otpModel, jwtService, mailService, botService) {
        this.userModel = userModel;
        this.otpModel = otpModel;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.botService = botService;
    }
    async generateTokens(user) {
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
    async signUp(createUserDto, res) {
        const user = await this.userModel.findOne({
            where: { email: createUserDto.email },
        });
        if (user) {
            throw new common_1.BadRequestException("Bunday fordalanuvchi mavjud");
        }
        if (createUserDto.password !== createUserDto.confirm_password) {
            throw new common_1.BadRequestException("Parollar mos emas");
        }
        const hashed_password = await bcrypt.hash(createUserDto.password, 7);
        const newUser = await this.userModel.create({
            ...createUserDto,
            hashed_password,
        });
        const tokens = await this.generateTokens(newUser);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
        const activation_link = uuid.v4();
        const updatedUser = await this.userModel.update({
            hashed_refresh_token,
            activation_link,
        }, {
            where: { id: newUser.id },
            returning: true,
        });
        res.cookie("refresh_token", tokens.refresh_token, {
            httpOnly: true,
            maxAge: +process.env.REFRESH_TIME_MS,
        });
        try {
            await this.mailService.sendMail(updatedUser[1][0]);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException("xat yuborish xatolik");
        }
        const respones = {
            message: "User registered",
            user: updatedUser[1][0],
            access_token: tokens.access_token,
        };
        return respones;
    }
    async newOtp(phoneUserDto) {
        const phone_number = phoneUserDto.phone;
        const otp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const isSend = await this.botService.sendOTP(phone_number, otp);
        if (!isSend) {
            throw new common_1.BadRequestException("Please, regiter the bot");
        }
        const now = new Date();
        const expiration_time = (0, addMinutes_1.AddMinutesToDate)(now, 5);
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
        const encodedData = await (0, crypto_1.encode)(JSON.stringify(details));
        return { message: "OTP has been sent ot Telegram", details: encodedData };
    }
    async verifyOtp(verifyOtpDto) {
        const { verification_key, otp, phone_number } = verifyOtpDto;
        const currentDate = new Date();
        console.log(verification_key);
        const decodedData = await (0, crypto_1.decode)(verification_key);
        const details = JSON.parse(decodedData);
        if (details.phone_number != phone_number) {
            throw new common_1.BadRequestException("OTP was not sent to this phone number.");
        }
        const resultOtp = await this.otpModel.findOne({
            where: { id: details.otp_id },
        });
        if (!resultOtp) {
            throw new common_1.BadRequestException("Not exist such OTP");
        }
        if (resultOtp.verified) {
            throw new common_1.BadRequestException("This OTP is already checked!");
        }
        if (resultOtp.expiration_time < currentDate) {
            throw new common_1.BadRequestException("OTP time is expired!");
        }
        if (resultOtp.otp != otp) {
            throw new common_1.BadRequestException("OTP is not matched!");
        }
        const user = await this.userModel.update({ is_owner: true }, { where: { phone: phone_number }, returning: true });
        console.log(user[1][0].phone, "@", phone_number);
        if (!user[1][0]) {
            throw new common_1.BadRequestException("Not exist such user");
        }
        await this.otpModel.update({
            verified: true,
        }, {
            where: { id: details.otp_id },
        });
        const response = {
            message: "Now, you are owner!",
            owner: user[1][0].is_owner,
        };
        return response;
    }
    create(createUserDto) {
        return `This action returns create users`;
    }
    findAll() {
        return this.userModel.findAll({ include: { all: true } });
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
__decorate([
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersService.prototype, "findAll", null);
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(otp_model_1.Otp)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, mail_service_1.MailService,
        bot_service_1.BotService])
], UsersService);
//# sourceMappingURL=users.service.js.map