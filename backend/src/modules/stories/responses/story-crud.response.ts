import { ApiProperty } from '@nestjs/swagger';
import { Story } from '@prisma/client';

export class CreateResponse {
  @ApiProperty({
    description: 'Story',
    example: {
      story: {
        id: 1,
        title: 'My Story',
        description: 'This is an amazing story about...',
        image: null,
        authorId: 1,
        createdAt: '2025-05-23T11:54:27.417Z',
        updatedAt: '2025-05-23T11:54:27.417Z',
        isPublic: false,
      },
    },
  })
  story: Story;
}

export class FindAllResponse {
  @ApiProperty({
    description: 'Stories',
    example: {
      stories: [
        {
          id: 1,
          title: 'My Story',
          description: 'This is an amazing story about...',
          image: null,
          authorId: 1,
          createdAt: '2025-05-23T11:54:27.417Z',
          updatedAt: '2025-05-23T11:54:27.417Z',
          isPublic: false,
        },
        {
          id: 2,
          title: 'My Story 2',
          description: 'This is an amazing story about... 2',
          image: null,
          authorId: 1,
          createdAt: '2025-05-23T11:55:35.887Z',
          updatedAt: '2025-05-23T11:55:35.887Z',
          isPublic: false,
        },
      ],
    },
  })
  stories: Story[];
}

export class FindOneResponse {
  @ApiProperty({
    description: 'Story',
    example: {
      story: {
        id: 1,
        title: 'My Story',
        description: 'This is an amazing story about...',
        image: null,
        authorId: 1,
        createdAt: '2025-05-23T11:54:27.417Z',
        updatedAt: '2025-05-23T11:54:27.417Z',
        isPublic: false,
      },
    },
  })
  story: Story;
}

export class UpdateResponse {
  @ApiProperty({
    description: 'Story',
    example: {
      story: {
        id: 1,
        title: 'My Story',
        description: 'This is an amazing story about...',
        image: null,
        authorId: 1,
        createdAt: '2025-05-23T11:54:27.417Z',
        updatedAt: '2025-05-23T11:54:27.417Z',
        isPublic: false,
      },
    },
  })
  story: Story;
}

export class DeleteResponse {
  @ApiProperty({
    description: 'Story',
    example: {
      story: {
        id: 1,
        title: 'My Story',
        description: 'This is an amazing story about...',
        image: null,
        authorId: 1,
        createdAt: '2025-05-23T11:54:27.417Z',
        updatedAt: '2025-05-23T11:54:27.417Z',
        isPublic: false,
      },
    },
  })
  story: Story;
}