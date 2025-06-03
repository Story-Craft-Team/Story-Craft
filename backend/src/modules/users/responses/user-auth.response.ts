import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserWithoutPassword } from 'src/common/types/UserWithoutPassword';

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

export class MeResponse {
  @ApiProperty({
    description: 'Information about user with JWT',
    example: {
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODkyODAyNiwiZXhwIjoxNzQ4OTMxNjI2fQ.JYRzCPbprIyV1kJmhGy5t4B_AQkwK9jmiBLBFNyC-ak",
      id: 2,
      username: "admin",
      email: "admin@gmail.com",
      role: "admin",
      createdAt: "2025-05-23T11:16:25.780Z",
      updatedAt: "2025-05-30T09:53:13.602Z",
      isVerified: true,
      displayName: "Andrey",
      bio: null,
      avatarUrl: "https://example.com/avatar.jpg",
      plan: "level_2",
      planWillDeleteAt: "2025-06-13T09:53:13.600Z",
      planCreatedAt: "2025-05-30T09:53:13.600Z"
    },
  })
  user: UserWithoutPassword;
}

export class LogoutResponse {
  @ApiProperty({
    description: 'User JWT revoked',
    example: {
      message: "User has been logged out"
    },
  })
  user: UserWithoutPassword;
}
