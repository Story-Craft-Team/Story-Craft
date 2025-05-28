import { PrismaService } from 'src/modules/deffault/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSceneDto } from '../dto/create-scene.dto';
import { HelpersService } from 'src/modules/deffault/helpers/services/helpers.service';
import { Scene, Story } from '@prisma/client';
import { UpdateSceneDto } from '../dto/update-scene.dto';
import {
  CreateResponse,
  FindAllResponse,
  FindOneResponse,
  UpdateResponse,
  DeleteResponse,
} from '../responses/scene-crud.response';

@Injectable()
export class SceneCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
  ) {}

  async create(userId: number, storyId: number, data: CreateSceneDto): Promise<CreateResponse> {
    try {
      const story = await this.helpers.getEntityOrThrow<Story>('story', { id: storyId }, 'Story');
      if (userId !== story.authorId) throw new BadRequestException('You are not the author of this story');


      if (typeof data === 'object') {
        if (Object.keys(data).length === 0) {
          throw new BadRequestException('No data to update');
        }
      } else {
        throw new BadRequestException('Invalid data');
      }

      const createdScene: Scene = await this.prisma.scene.create({
        data: {
          ...data,
          storyId,
          description: data.description || '',
          isEnd: data.isEnd || false,
          maxChoices: 1,
        },
      });

      return { scene: createdScene };
    } catch (error) {
      throw error;
    }
  }

  async findAll(storyId: number): Promise<FindAllResponse> {
    try {
      await this.helpers.getEntityOrThrow<Story>('story', { id: storyId }, 'Story');
      const scenes = await this.helpers.getEntityOrThrow<Scene>('scene', { storyId }, 'Scene', {isArray: true});

      if (!scenes) throw new Error('Scenes not found');

      return { scenes };
    } catch (error) {
      throw error;
    }
  }

  async findOne(storyId: number, id: number): Promise<FindOneResponse> {
    try {
      await this.helpers.getEntityOrThrow<Story>('story', { id: storyId }, 'Story');
      await this.helpers.getEntityOrThrow<Scene>('scene', { id, storyId }, 'Scene');

      const scene = await this.prisma.scene.findUnique({
        where: { id, storyId },
      });
      if (!scene) throw new Error('Scene not found');

      return { scene };
    } catch (error) {
      throw error;
    }
  }

  async update(
    storyId: number,
    id: number,
    data: UpdateSceneDto,
  ): Promise<UpdateResponse> {
    try {
      await this.helpers.getEntityOrThrow<Story>('story', { id: storyId }, 'Story');
      await this.helpers.getEntityOrThrow<Scene>('scene', { id, storyId }, 'Scene');

      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined),
      );

      if (Object.keys(cleanData).length === 0) {
        throw new BadRequestException('No data to update');
      }

      const scene = await this.prisma.scene.findUnique({
        where: { id, storyId },
      });
      if (!scene) throw new Error('Scene not found');

      const updatedScene: Scene = await this.prisma.scene.update({
        where: { storyId, id },
        data: {
          ...cleanData,
        },
      });

      return { scene: updatedScene };
    } catch (error) {
      throw error;
    }
  }

  async delete(storyId: number, id: number): Promise<DeleteResponse> {
    try {
      await this.helpers.getEntityOrThrow<Story>('story', { id: storyId }, 'Story');
      await this.helpers.getEntityOrThrow<Scene>('scene', { id, storyId }, 'Scene');

      const deletedScene: Scene = await this.prisma.scene.delete({
        where: { storyId, id },
      });

      return { scene: deletedScene };
    } catch (error) {
      throw error;
    }
  }
}
