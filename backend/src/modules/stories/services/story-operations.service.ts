import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { HelpersService } from 'src/modules/helpers/services/helpers.service';
import { Story } from '@prisma/client';

@Injectable()
export class StoryOperationsService {
  constructor(private readonly prisma: PrismaService, private readonly helpers: HelpersService) {}

  // Get length
  async getLength(id: number) {
    try {
      await this.helpers.getIdOrThrow<Story>('story', id, 'Story');
      return { lengthScenes: 3 }; // TODO: Implement length scenes calculation
    } catch (error) {
      throw error;
    }
  }

  // Public story
  async publicStory(userId: number, id: number) {
    try {
      await this.helpers.getIdOrThrow<Story>('story', id, 'Story');
      // if ()
      return { story: await this.prisma.story.update({ where: { id }, data: { isPublic: true } }) };
    } catch (error) {
      throw error;
    }
  }

  // Private story
  async privateStory(userId: number, id: number) {
    try {
      await this.helpers.getIdOrThrow<Story>('story', id, 'Story');
      return { story: await this.prisma.story.update({ where: { id }, data: { isPublic: false } }) };
    } catch (error) {
      throw error;
    }
  }
}
