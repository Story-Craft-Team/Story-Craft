import { ApiProperty } from '@nestjs/swagger';

export class UserSettingsDto {
  @ApiProperty({ type: () => String, example: 'dark' }) theme: string;
  @ApiProperty({ type: () => String, example: 'ru' }) language: string;
}
