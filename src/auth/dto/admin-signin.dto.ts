import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AdminSignInDto {
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
