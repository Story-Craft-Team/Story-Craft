import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStoryDto {

  @IsString()
  @ApiProperty({
    description: 'Title of the story',
    type: () => String,
    example: 'My Story',
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Description of the story',
    type: () => String,
    example: 'This is an amazing story about...',
    required: false,
  })
  @IsOptional()
  description?: string;
}
