import { ApiProperty } from "@nestjs/swagger";

export class CreateRegionDto {
 
 @ApiProperty({
example:"Toshkent",
description:"Region name"
 })
 // @IsString()
  // @IsNotEmpty()
  name: string;
}

