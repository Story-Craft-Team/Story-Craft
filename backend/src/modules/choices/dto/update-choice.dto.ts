import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateChoiceDto {
  @ApiProperty({
    description: 'ID of the choice',
    type: () => Number,
    example: 4,
  })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: 'Text of the choice',
    type: () => String,
    example: 'Choice text',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(200)
  text?: string;

  @ApiProperty({
    description: 'Next scene ID',
    type: () => Number,
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  nextSceneId?: number;

  @ApiProperty({
    description: 'Access to the choice',
    type: () => Boolean,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  access?: boolean;

  @ApiProperty({
    description: 'Scene ID',
    type: () => Number,
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  sceneId?: number;

  @ApiProperty({
    description: 'Story ID',
    type: () => Number,
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  storyId?: number;
}
