import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserSettingsDto } from './user-settings.dto';
import { Type } from 'class-transformer';
import { Plan } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    type: () => String,
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: 'Email address of the user',
    type: () => String,
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    type: () => String,
    example: 'strongPassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Display name of the user (optional)',
    type: () => String,
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  displayName?: string;

  @ApiProperty({
    description: "URL to the user's avatar image (optional)",
    type: () => String,
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(200)
  avatarUrl?: string;

  @ApiProperty({
    description: 'User settings',
    type: () => UserSettingsDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserSettingsDto)
  settings?: UserSettingsDto;
}
