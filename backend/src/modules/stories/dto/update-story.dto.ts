import { ApiProperty } from "@nestjs/swagger";
import { Choice, Scene } from "@prisma/client";
import { IsBoolean, IsString } from "class-validator";
import { IsArray } from "class-validator";

export class UpdateStoryDto {
  @ApiProperty({
      description: 'Title of the story',
      example: 'My Story',
  })
  @IsString()
  title?: string;

  @ApiProperty({
      description: 'Description of the story',
      example: 'This is my story',
  })
  @IsString()
  description?: string;

  @ApiProperty({
      description: 'Image of the story',
      example: 'https://example.com/image.jpg',
  })
  @IsString()
  image?: string;

  @ApiProperty({
      description: 'Is the story public',
      example: true,
  })
  @IsBoolean()
  isPublic?: boolean;

  @ApiProperty({
      description: 'Choices of the story',
      example: [],
  })
  @IsArray()
  choices?: Choice[];

  @ApiProperty({
      description: 'Scenes of the story',
      example: [],
  })
  @IsArray()
  scenes?: Scene[];
}
