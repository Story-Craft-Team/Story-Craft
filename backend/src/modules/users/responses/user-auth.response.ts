import { ApiProperty } from '@nestjs/swagger';
import { UserWithoutPassword } from 'src/modules/helpers/services/user-helpers.service';

export class RegisterResponse {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'User information without password',
    example: {
      id: 1,
      username: 'john_doe',
      email: 'john.doe@example.com',
      displayName: 'John Doe',
      avatarUrl: 'https://example.com/avatar.jpg',
      createdAt: '2025-05-21T22:20:36.000Z',
      updatedAt: '2025-05-21T22:20:36.000Z',
      settings: {
        theme: 'dark',
        language: 'ru',
      },
    },
  })
  user: UserWithoutPassword;
}

export class LoginResponse {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'User information without password',
    example: {
      id: 1,
      username: 'john_doe',
      email: 'john.doe@example.com',
      displayName: 'John Doe',
      avatarUrl: 'https://example.com/avatar.jpg',
      createdAt: '2025-05-21T22:20:36.000Z',
      updatedAt: '2025-05-21T22:20:36.000Z',
      settings: {
        theme: 'dark',
        language: 'ru',
      },
    },
  })
  user: UserWithoutPassword;
}
