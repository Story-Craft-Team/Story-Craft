import { PrismaService } from 'src/modules/deffault/prisma/prisma.service';
import { HelpersService } from 'src/modules/deffault/helpers/services/helpers.service';
import { CreateChoiceDto } from '../dto/create-choice.dto';
import { CreateResponse } from '../responses/choice-crud.response';
import { Choice } from '@prisma/client';
import {
  DeleteResponse,
  FindAllResponse,
  FindOneResponse,
  UpdateResponse,
} from '../responses/choice-crud.response';
import { UpdateChoiceDto } from '../dto/update-choice.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChoiceCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
  ) {}

  async create(
    storyId: number,
    sceneId: number,
    dto: CreateChoiceDto,
  ): Promise<CreateResponse> {
    try {
      const newChoice = {
        ...dto,
        access: true,
        storyId,
        sceneId,
      };

      const createdChoice = await this.prisma.choice.create({
        data: newChoice,
      });

      return { choice: createdChoice };
    } catch (error) {
      throw error;
    }
  }

  async findAll(storyId: number, sceneId: number): Promise<FindAllResponse> {
    try {
      const choices = await this.helpers.getEntityOrThrow<Choice>(
        'choice',
        { storyId, sceneId },
        'Choice',
        { isArray: true },
      );
      return { choices };
    } catch (error) {
      throw error;
    }
  }

  async findOne(
    storyId: number,
    sceneId: number,
    id: number,
  ): Promise<FindOneResponse> {
    try {
      const choice = await this.helpers.getEntityOrThrow<Choice>(
        'choice',
        { id, storyId, sceneId },
        'Choice',
      );
      return { choice };
    } catch (error) {
      throw error;
    }
  }

  async update(
    storyId: number,
    sceneId: number,
    id: number,
    data: UpdateChoiceDto,
  ): Promise<UpdateResponse> {
    try {
      await this.helpers.getEntityOrThrow<Choice>(
        'choice',
        { id, storyId, sceneId },
        'Choice',
      );
      const updatedChoice = await this.prisma.choice.update({
        where: { id, storyId, sceneId },
        data,
      });
      return { choice: updatedChoice };
    } catch (error) {
      throw error;
    }
  }

  async delete(
    storyId: number,
    sceneId: number,
    id: number,
  ): Promise<DeleteResponse> {
    try {
      await this.helpers.getEntityOrThrow<Choice>(
        'choice',
        { id, storyId, sceneId },
        'Choice',
      );
      const deletedChoice = await this.prisma.choice.delete({
        where: { id, storyId, sceneId },
      });
      return { choice: deletedChoice };
    } catch (error) {
      throw error;
    }
  }
}
