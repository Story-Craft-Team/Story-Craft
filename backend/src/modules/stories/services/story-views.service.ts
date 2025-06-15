import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/deffault/prisma/prisma.service';
import { HelpersService } from 'src/modules/deffault/helpers/services/helpers.service';
import { User, Story, View } from '@prisma/client';
import { ViewStoryResponse } from '../responses/story-views.response';

@Injectable()
export class StoryViewsService {
  constructor(private readonly prisma: PrismaService,
    private readonly helpers: HelpersService
  ) {}

  // Get views of the story
  async getViews(storyId: number): Promise<{ views: View[]}> {
    try {
      await this.helpers.getEntityOrThrow<Story>('story', { id: storyId }, 'Story');
      const views = await this.prisma.view.findMany({
        where: {
          storyId,
        },
      });
      return { views }
    } catch (error) {
      throw error;
    }
  }

  // View story
  async viewStory(userId: number, storyId: number): Promise<ViewStoryResponse | null> {
    try {
      await this.helpers.getEntityOrThrow<User>('user', { id: userId }, 'User');
      await this.helpers.getEntityOrThrow<Story>('story', { id: storyId }, 'Story');

      const view = await this.prisma.view.findUnique({
        where: {
          userId_storyId: {
            userId,
            storyId,
          },
        },
      });

      if (view) return null

      const newView = await this.prisma.view.create({
        data: {
          userId,
          storyId,
        },
      });
      return { view: newView };
    } catch (error) {
      throw error;
    }
  }
}
