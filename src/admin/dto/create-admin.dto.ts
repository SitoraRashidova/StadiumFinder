import {
  IsAlphanumeric,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  tg_link: string;

  @IsString()
  @IsNotEmpty()
  admin_photo: string;

  @IsString()
  @IsNotEmpty()
  hashed_password: string;

  @IsBoolean()
  @IsOptional()
  is_creator: boolean;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsString()
  
  hashed_refresh_password: string;
}
