import { ApiProperty } from '@nestjs/swagger';
import { UserWithoutPassword } from 'src/common/types/UserWithoutPassword';

export class RegisterResponse {
  @ApiProperty({
    description: 'JWT access and refresh tokens',
    example: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }
  })
  tokens: {
    accessToken: string,
    refreshToken: string,
  }

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
    description: 'JWT access and refresh tokens',
    example: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }
  })
  tokens: {
    accessToken: string,
    refreshToken: string,
  }

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
    description: 'JWT access and refresh tokens',
    example: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }
  })
  tokens: {
    accessToken: string,
    refreshToken: string,
  }

  @ApiProperty({
    description: 'Information about user with JWT',
    example: {
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
  data: string;
}

export class RefreshTokenResponse {
  @ApiProperty({
    description: 'User JWT access token has been updated',
    example: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
  })
  tokens: string;
}