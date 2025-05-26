import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/deffault/prisma/prisma.service';
import { HelpersService } from 'src/modules/deffault/helpers/services/helpers.service';
import { Choice } from '@prisma/client';
@Injectable()
export class ChoiceOperationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
  ) {}

  async setNextSceneId(
    storyId: number,
    sceneId: number,
    choiceId: number,
    nextSceneId: number,
  ) {
    const choice = await this.helpers.getEntityOrThrow<Choice>(
      'choice',
      { id: choiceId, storyId, sceneId },
      'Choice',
    );
    const updatedChoice = await this.prisma.choice.update({
      where: { id: choiceId, storyId, sceneId },
      data: { nextSceneId },
    });
    return { choice: updatedChoice };
  }
}