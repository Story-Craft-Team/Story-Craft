import { Choice } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSceneDto {
  
@ApiProperty()
@IsString()
@IsNotEmpty()
title: string;

@ApiProperty()
@IsBoolean()
@IsOptional()
isEnd?: boolean;

@ApiProperty()
@IsString()
@IsOptional()
description?: string;
}