import { ApiProperty } from "@nestjs/swagger";
import { Choice } from "@prisma/client";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsNumber, IsArray } from "class-validator";

export class UpdateSceneDto {
  
@ApiProperty(
  {
    description: 'ID of the scene',
    type: () => Number,
    example: 1,
    required: false,
  }
)
@IsNumber()
@IsOptional()
id?: number;

@ApiProperty(
  {
    description: 'Title of the scene',
    type: () => String,
    example: 'My Scene',
    required: false,
  }
)
@IsString()
@IsOptional()
title?: string;

@ApiProperty(
  {
    description: 'Image of the scene',
    type: () => String,
    example: 'https://example.com/image.jpg',
    required: false,
  }
)
@IsString()
@IsOptional()
image?: string;

@ApiProperty(   
  {
    description: 'Is the scene the end of the story?',
    type: () => Boolean,
    example: true,
    required: false,
  }
)
@IsBoolean()
@IsOptional()
isEnd?: boolean;

@ApiProperty(
  {
    description: 'ID of the story',
    type: () => Number,
    example: 1,
    required: false,
  }
)
@IsNumber()
@IsOptional()
storyId?: number;

@ApiProperty(
  {
    description: 'Description of the scene',
    type: () => String,
    example: 'This is an amazing scene about...',
    required: false,
  }
)
@IsString()
@IsOptional()
description?: string;

@ApiProperty(
  {
    description: 'Maximum number of choices',
    type: () => Number,
    example: 3,
    required: false,
  }
)
@IsNumber()
@IsOptional()
maxChoices?: number;

@ApiProperty(
  {
    description: 'Choices of the scene',
    type: () => Array,
    example: [],
    required: false,
  }
)
@IsArray()
@IsOptional()
choices?: Choice[];

}