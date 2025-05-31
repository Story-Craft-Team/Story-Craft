import { ApiProperty } from '@nestjs/swagger';
import { UserWithoutPassword } from 'src/common/types/UserWithoutPassword';

export class RegisterResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    example: {
      id: 1,
      username: 'reader',
      email: 'reader@example.com',
      role: 'reader',
      createdAt: '2025-05-25T11:00:42.838Z',
      updatedAt: '2025-05-25T11:00:42.838Z',
      isVerified: false,
      displayName: 'Reader',
      bio: null,
      avatarUrl: 'https://example.com/avatar.jpg',
      settings: {
        theme: 'dark',
        language: 'ru',
        userId: 1,
      },
    },
  })
  user: UserWithoutPassword;
}

export class RegisterResponse404 {
  @ApiProperty({
    example: 'Username or email already exists',
  })
  message: string;

  @ApiProperty({
    example: 'conflict',
  })
  error: string;

  @ApiProperty({
    example: '409',
  })
  statusCode: number;
}

export class LoginResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })

  accessToken: string;
  @ApiProperty({
    example: {
      id: 2,
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      createdAt: '2025-05-25T11:11:37.199Z',
      updatedAt: '2025-05-26T04:33:58.991Z',
      isVerified: true,
      displayName: 'Admin',
      bio: null,
      avatarUrl: 'https://example.com/avatar.jpg',
    },
  })
  user: UserWithoutPassword;
}

export class LoginResponse404 {
  @ApiProperty({
    example: 'User with this email not found',
  })
  message: string;

  @ApiProperty({
    example: 'Not found',
  })
  error: string;

  @ApiProperty({
    example: '404',
  })
  statusCode: number;
}

export class LoginResponse400 {
  @ApiProperty({
    example: 'Invalid credentials',
  })
  message: string;

  @ApiProperty({
    example: 'Bad request',
  })
  error: string;

  @ApiProperty({
    example: '400',
  })
  statusCode: number;
}
