import { ApiProperty } from '@nestjs/swagger';
import { Follow } from '@prisma/client';

export class UserFollows {
  @ApiProperty({
    description: 'follows',
    example: {
      follows: [
        {
          id: 13,
          followerId: 12,
          followingId: 11,
          followedUser: {
            id: 12,
            username: 'john_doe2',
            email: 'john.doe2@example.com',
            role: 'reader',
            createdAt: '2025-05-22T13:58:49.911Z',
            updatedAt: '2025-05-22T13:58:49.911Z',
            isVerified: false,
            displayName: 'John Doe',
            bio: null,
            avatarUrl: 'https://example.com/avatar.jpg',
          },
        },
      ],
    },
  })
  follows: Follow[];
}

export class UserFollowResponse {
  @ApiProperty({
    description: 'follow response',
    example: {
      follows: {
        follows: {
          follows: [
            {
              id: 11,
              followerId: 1,
              followingId: 11,
              followedUser: {
                id: 1,
                username: 'jumper',
                email: 'john.doe1@example.com',
                role: 'moderator',
                createdAt: '2025-05-18T13:25:41.675Z',
                updatedAt: '2025-05-18T20:00:17.464Z',
                isVerified: true,
                displayName: 'John Doe',
                bio: 'This is my bio',
                avatarUrl: 'https://example.com/avatar.jpg',
              },
            },
            {
              id: 12,
              followerId: 12,
              followingId: 11,
              followedUser: {
                id: 12,
                username: 'john_doe2',
                email: 'john.doe2@example.com',
                role: 'reader',
                createdAt: '2025-05-22T13:58:49.911Z',
                updatedAt: '2025-05-22T13:58:49.911Z',
                isVerified: false,
                displayName: 'John Doe',
                bio: null,
                avatarUrl: 'https://example.com/avatar.jpg',
              },
            },
          ],
        },
      },
    },
  })
  follows: Follow[];
}

export class UserUnfollowResponse {
  @ApiProperty({
    description: 'unfollow response',
    example: {
      follows: [
        {
          id: 13,
          followerId: 12,
          followingId: 11,
          followedUser: {
            id: 12,
            username: 'john_doe2',
            email: 'john.doe2@example.com',
            role: 'reader',
            createdAt: '2025-05-22T13:58:49.911Z',
            updatedAt: '2025-05-22T13:58:49.911Z',
            isVerified: false,
            displayName: 'John Doe',
            bio: null,
            avatarUrl: 'https://example.com/avatar.jpg',
          },
        },
      ],
    },
  })
  follows: Follow[];
}
