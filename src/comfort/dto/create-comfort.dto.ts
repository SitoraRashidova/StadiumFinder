import { ApiProperty } from "@nestjs/swagger";

export class CreateComfortDto {
  @ApiProperty({
    example: "Wi-Fi",
    description: "comfort name",
  })
  //   @IsString()
  //   @IsNotEmpty()
  name: string;
}
