import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/deffault/prisma/prisma.service';
import { HelpersService } from 'src/modules/deffault/helpers/services/helpers.service';
import { Story } from '@prisma/client';

@Injectable()
export class StoryOperationsService {
  constructor(private readonly prisma: PrismaService, private readonly helpers: HelpersService) {}

  // Public story
  async publicStory(userId: number, id: number) {
    try {
      const story = await this.helpers.getEntityOrThrow<Story>('story', { id }, 'Story');
      if (userId !== story.authorId) throw new BadRequestException('You are not the author of this story');
      if (story.isPublic) throw new BadRequestException('Story is already public');
      return { story: await this.prisma.story.update({ where: { id }, data: { isPublic: true } }) };
    } catch (error) {
      throw error;
    }
  }

  // Private story
  async privateStory(userId: number, id: number) {
    try {
      const story = await this.helpers.getEntityOrThrow<Story>('story', { id }, 'Story');
      if (userId !== story.authorId) throw new BadRequestException('You are not the author of this story');
      if (!story.isPublic) throw new BadRequestException('Story is already private');
      return { story: await this.prisma.story.update({ where: { id }, data: { isPublic: false } }) };
    } catch (error) {
      throw error;
    }
  }
}
