import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsPassportNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserCardDto {
  @ApiProperty({
    example: "BBR",
    description: "Card name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Uz phone number",
  })
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({
    example: "9860........8941",
    description: "Card number",
  })
  @IsNumber()
  number: string;

  @ApiProperty({
    example: "26",
    description: "Card year",
  })
  @IsNumber()
  year: string;

  @ApiProperty({
    example: "11",
    description: "Card month",
  })
  @IsNumber()
  month: string;

  @ApiProperty({
    example: "",
    description: "",
  })
  @IsBoolean()
  is_main:boolean;
}
