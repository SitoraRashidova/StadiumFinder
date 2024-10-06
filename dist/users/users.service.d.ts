import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./models/user.model";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { MailService } from "../mail/mail.service";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { BotService } from "../bot/bot.service";
import { Otp } from "../otp/otp.model";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
export declare class UsersService {
    private userModel;
    private otpModel;
    private readonly jwtService;
    private readonly mailService;
    private readonly botService;
    constructor(userModel: typeof User, otpModel: typeof Otp, jwtService: JwtService, mailService: MailService, botService: BotService);
    generateTokens(user: User): unknown;
    signUp(createUserDto: CreateUserDto, res: Response): unknown;
    newOtp(phoneUserDto: PhoneUserDto): unknown;
    verifyOtp(verifyOtpDto: VerifyOtpDto): unknown;
    create(createUserDto: CreateUserDto): string;
    findAll(): any;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
