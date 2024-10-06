import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserWalletDto {
  @ApiProperty({
    example: "BBR",
    description: "Card name",
  })
  @IsString()
  @IsNotEmpty()
  wallet: string;
}
