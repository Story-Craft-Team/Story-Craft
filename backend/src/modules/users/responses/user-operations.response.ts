import { ApiProperty } from "@nestjs/swagger";
import { UserWithoutPassword } from "src/common/types/UserWithoutPassword";

export class UpdateRole {
  @ApiProperty({
    description: 'User information without password',
    example: {
        id: 1,
        username: 'john_doe',
        email: 'john.doe@example.com',
        role: "reader",
        createdAt: '2025-05-21T22:20:36.000Z',
        updatedAt: '2025-05-21T22:20:36.000Z',
        isVerified: true,
        displayName: 'John Doe',
        bio: null,
        avatarUrl: 'https://example.com/avatar.jpg',
    },
  })
  user: UserWithoutPassword;
}

export class UsersVerify {
  @ApiProperty({
    description: 'User information without password',
    example: {
        id: 1,
        username: 'john_doe',
        email: 'john.doe@example.com',
        role: "reader",
        createdAt: '2025-05-21T22:20:36.000Z',
        updatedAt: '2025-05-21T22:20:36.000Z',
        isVerified: true,
        displayName: 'John Doe',
        bio: null,
        avatarUrl: 'https://example.com/avatar.jpg',
    },
  })
  user: UserWithoutPassword;
} 