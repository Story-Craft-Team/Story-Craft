import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/deffault/prisma/prisma.service';
import { Story } from '@prisma/client';
import { CreateStoryDto } from '../dto/create-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { HelpersService } from 'src/modules/deffault/helpers/services/helpers.service';
import {
  CreateResponse,
  DeleteResponse,
  FindAllResponse,
  FindOneResponse,
  UpdateResponse,
} from '../responses/story-crud.response';

@Injectable()
export class StoryCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
  ) {}

  // Create Story
  async create(
    authorId: number,
    createStoryDto: CreateStoryDto,
  ): Promise<CreateResponse> {
    try {

      if (!createStoryDto.title) {
        throw new BadRequestException('Title is required');
      }
      
      const story = await this.prisma.story.create({
        data: {
          ...createStoryDto,
          authorId,
        },
      });
      
      return { story };
    } catch (error) {
      throw error;
    }
  }

  // Find All Stories
  async findAll(): Promise<FindAllResponse> {
    try {
      const stories = await this.prisma.story.findMany();
      return { stories };
    } catch (error) {
      throw error;
    }
  }

  // Find One Story
  async findOne(id: number): Promise<FindOneResponse> {
    try {
      const story: Story = await this.helpers.getEntityOrThrow(
        'story',
        { id },
        'Story',
      );
      return { story };
    } catch (error) {
      throw error;
    }
  }

  // Update Story
  async update(
    id: number,
    updateStoryDto: UpdateStoryDto,
  ): Promise<UpdateResponse> {
    try {
      await this.helpers.getEntityOrThrow('story', { id }, 'Story');

      if (Object.keys(updateStoryDto).length === 0) {
        throw new BadRequestException('No data to update');
      }

      const updatedStory = await this.prisma.story.update({
        where: { id },
        data: {
          ...updateStoryDto,
          scenes: {
            deleteMany: {
              storyId: id,
            },
          },
          choices: {
            deleteMany: {
              storyId: id,
            },
          },
        },
      }); // TODO: Refactor

      return { story: updatedStory };
    } catch (error) {
      throw error;
    }
  }

  // Update My Story
  async updateMyStory(
    authorId: number,
    id: number,
    updateStoryDto: UpdateStoryDto,
  ): Promise<UpdateResponse> {
    const story: Story = await this.helpers.getEntityOrThrow('story', { id }, 'Story');

    if (Object.keys(updateStoryDto).length === 0) {
      throw new BadRequestException('No data to update');
    }

    if (story.authorId !== authorId) {
      throw new BadRequestException('You are not the author of this story');
    }

    try {
      const updatedStory = await this.prisma.story.update({
        where: { id },
        data: {
          ...updateStoryDto,
          scenes: {
            deleteMany: {
              storyId: id,
            },
          },
          choices: {
            deleteMany: {
              storyId: id,
            },
          },
        },
      }); // TODO: Refactor

      return { story: updatedStory };
    } catch (error) {
      throw error;
    }
  }

  // Remove Story
  async remove(id: number): Promise<DeleteResponse> {
    try {
      await this.helpers.getEntityOrThrow('story', { id }, 'Story');

      const deletedStory = await this.prisma.story.delete({ where: { id } });
      
      return { story: deletedStory };
    } catch (error) {
      throw error;
    }
  }

  // Remove My Story
  async removeMyStory(authorId: number, id: number): Promise<DeleteResponse> {
    try {
      const story: Story = await this.helpers.getEntityOrThrow('story', { id }, 'Story');

      if (story.authorId !== authorId) {
        throw new BadRequestException('You are not the author of this story');
      }

      const deletedStory = await this.prisma.story.delete({ where: { id } });

      return { story: deletedStory };
    } catch (error) {
      throw error;
    }
  }
}
