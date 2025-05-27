import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/deffault/prisma/prisma.service';
import { LikeStoryResponse, UnlikeStoryResponse } from '../responses/story-likes.response';
import { HelpersService } from 'src/modules/deffault/helpers/services/helpers.service';
import { User, Story } from '@prisma/client';

@Injectable()
export class StoryLikesService {
  constructor(private readonly prisma: PrismaService,
    private readonly helpers: HelpersService
  ) {}

  // Get likes of the story
  async getLikes(storyId: number): Promise<number> {
    try {
      await this.helpers.getEntityOrThrow<Story>('story', { id: storyId }, 'Story');
      const likes = await this.prisma.like.count({
        where: {
          storyId,
        },
      });
      return likes;
    } catch (error) {
      throw error;
    }
  }

  // Like story
  async likeStory(userId: number, storyId: number): Promise<LikeStoryResponse> {
    try {
      await this.helpers.getEntityOrThrow<User>('user', { id: userId }, 'User');
      await this.helpers.getEntityOrThrow<Story>('story', { id: storyId }, 'Story');
      
      const like = await this.prisma.like.create({
        data: {
          userId,
          storyId,
        },
      });
      return { like };
    } catch (error) {
      throw error;
    }
  }

  // Unlike story
  async unlikeStory(userId: number, storyId: number): Promise<UnlikeStoryResponse> {
    try {
      await this.helpers.getEntityOrThrow<User>('user', { id: userId }, 'User');
      await this.helpers.getEntityOrThrow<Story>('story', { id: storyId }, 'Story');

      const like = await this.prisma.like.delete({
        where: {
          userId_storyId: {
            userId,
            storyId,
          },
        },
      });
      return { like };
    } catch (error) {
      throw error;
    }
  }
}
