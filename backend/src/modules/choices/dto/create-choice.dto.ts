import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateChoiceDto {
  @ApiProperty({
    description: 'Text of the choice',
    type: () => String,
    example: 'Choice text',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  text: string;

  @ApiProperty({
    description: 'Next scene ID',
    type: () => Number,
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  nextSceneId: number;
}
