
import { ApiProperty } from "@nestjs/swagger";

export class CreateDistrictDto {
  @ApiProperty({
    example: "Chilonzor",
    description: "District name",
  })
  // @IsString({ message: "Name must be a string" })
  // @IsNotEmpty({ message: "Name should not be empty" })
  // @MaxLength(100, {
  //   message: "Name must be shorter than or equal to 100 characters",
  // })
  name: string;

  @ApiProperty({
    example: 1,
    description: "Region ID that the district belongs to",
  })
  // @IsNumber({}, { message: "Region ID must be a number" })
  regionId: number;
}
