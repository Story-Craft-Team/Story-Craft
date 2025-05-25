import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/default/prisma/prisma.service';
import { HelpersService } from 'src/modules/helpers/services/helpers.service';
import { Scene, Story } from '@prisma/client';
import { changeEndResponse } from '../responses/scene-operations.response';

@Injectable()
export class SceneOperationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
  ) {}

  async endScene(
    userId: number,
    storyId: number,
    sceneId: number,
  ): Promise<changeEndResponse> {
    try {
      const story = await this.helpers.getEntityOrThrow<Story>(
        'story',
        { id: storyId },
        'Story',
      );
      const scene = await this.helpers.getEntityOrThrow<Scene>(
        'scene',
        { id: sceneId, storyId },
        'Scene',
      );
      if (story?.authorId !== userId) throw new Error('Unauthorized');
      const newIsEnd = !scene?.isEnd;
      const updatedScene = await this.prisma.scene.update({
        where: { id: sceneId, storyId },
        data: { isEnd: newIsEnd },
      });
      return { scene: updatedScene };
    } catch (error) {
      throw error;
    }
  }
}
