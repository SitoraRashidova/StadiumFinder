import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    singUp(createUserDto: CreateUserDto, res: Response): unknown;
    verifyOtp(verifyOtpDto: VerifyOtpDto): unknown;
    newOtp(phoneUserDto: PhoneUserDto): unknown;
    findAll(): any;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
