import { SetMetadata } from '@nestjs/common';

export const KEEP_PASSWORD_KEY = 'keepPassword';
export const KeepPassword = () => SetMetadata(KEEP_PASSWORD_KEY, true);