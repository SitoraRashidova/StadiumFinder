import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator"

export class CreateUserDto {
  
  @IsString()
  @IsNotEmpty()
  full_name: string;
  @IsEmail()

  email: string;
 @IsPhoneNumber("UZ")
  phone: string;
  @IsString()
  tg_link: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
  @IsString()
  @IsOptional()
  photo: string;  
}
