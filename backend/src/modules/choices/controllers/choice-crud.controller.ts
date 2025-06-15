import { ApiTags } from '@nestjs/swagger';
import { Body, Controller } from '@nestjs/common';
import { ChoiceCrudService } from '../services/choice-crud.service';
import { CreateChoiceDto } from '../dto/create-choice.dto';
import { Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/deffault/auth/guards/jwt-auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { Param } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UpdateChoiceDto } from '../dto/update-choice.dto';
import { ApiParam } from '@nestjs/swagger';
import { Get } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import {
  CreateResponse,
  FindAllResponse,
  FindOneResponse,
  UpdateResponse,
  DeleteResponse,
} from '../responses/choice-crud.response';
@ApiTags('Choice - crud')
@Controller('/stories/:storyId/scenes/:sceneId/choices')
export class ChoiceCrudController {
  constructor(private readonly choiceCrudService: ChoiceCrudService) {}

  // Create one choice
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new choice' })
  @ApiBody({ type: CreateChoiceDto })
  @ApiResponse({
    status: 201,
    description: 'Choice has been successfully created.',
    type: CreateResponse,
  })
  @ApiParam({ name: 'storyId', type: 'string', description: 'Story id' })
  @ApiParam({ name: 'sceneId', type: 'string', description: 'Scene id' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Param('storyId') storyId: string,
    @Param('sceneId') sceneId: string,
    @Body() createChoiceDto: CreateChoiceDto,
  ) {
    return this.choiceCrudService.create(+storyId, +sceneId, createChoiceDto);
  }

  // Find all choices
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Retrieve all choices' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of choices',
    type: FindAllResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'No choices found',
  })
  findAll(
    @Param('storyId') storyId: string,
    @Param('sceneId') sceneId: string,
  ) {
    return this.choiceCrudService.findAll(+storyId, +sceneId);
  }

  // Find one choice
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Retrieve a single choice by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Choice ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a choice based on the provided ID',
    type: FindOneResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'Choice not found',
  })
  findOne(
    @Param('storyId') storyId: string,
    @Param('sceneId') sceneId: string,
    @Param('id') id: string,
  ) {
    return this.choiceCrudService.findOne(+storyId, +sceneId, +id);
  }

  // Update one choice
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a single choice by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Choice ID' })
  @ApiBody({ type: UpdateChoiceDto })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated choice',
    type: UpdateResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'Choice not found',
  })
  update(
    @Param('storyId') storyId: string,
    @Param('sceneId') sceneId: string,
    @Param('id') id: string,
    @Body() updateChoiceDto: UpdateChoiceDto,
  ) {
    return this.choiceCrudService.update(
      +storyId,
      +sceneId,
      +id,
      updateChoiceDto,
    );
  }

  // Delete one choice
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a single choice by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Choice ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the deleted choice',
    type: () => DeleteResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'Choice not found',
  })
  delete(
    @Param('storyId') storyId: string,
    @Param('sceneId') sceneId: string,
    @Param('id') choiceId: string,
  ) {
    return this.choiceCrudService.delete(+storyId, +sceneId, +choiceId);
  }
}
