import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
  Request,
} from '@nestjs/common';
import { SceneCrudService } from '../services/scene-crud.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateSceneDto } from '../dto/update-scene.dto';
import { CreateSceneDto } from '../dto/create-scene.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/deffault/auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  CreateResponse,
  FindAllResponse,
  FindOneResponse,
  UpdateResponse,
  DeleteResponse,
} from '../responses/scene-crud.response';
import { AuthRequest } from 'src/common/types';

@ApiTags('Scene - crud')
@Controller('stories/:storyId/scene')
export class SceneCrudController {
  constructor(private readonly sceneCrudService: SceneCrudService) {}

  // Create one scene
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new scene' })
  @ApiBody({ type: CreateSceneDto })
  @ApiResponse({
    status: 201,
    description: 'Scene has been successfully created.',
    type: CreateResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Request() req: AuthRequest,
    @Param('storyId') storyId: string,
    @Body() createSceneDto: CreateSceneDto,
  ) {
    return this.sceneCrudService.create(+req.user.id, +storyId, createSceneDto);
  }

  // Find all scenes
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Retrieve all scenes' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of scenes',
    type: FindAllResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'No scenes found',
  })
  findAll(@Param('storyId') storyId: string) {
    return this.sceneCrudService.findAll(+storyId);
  }

  // Find one scene
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Retrieve a single scene by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Scene ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a scene based on the provided ID',
    type: FindOneResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'Scene not found',
  })
  findOne(@Param('storyId') storyId: string, @Param('id') id: string) {
    return this.sceneCrudService.findOne(+storyId, +id);
  }

  // Update one scene
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a scene by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Scene ID' })
  @ApiBody({ type: UpdateSceneDto })
  @ApiResponse({
    status: 200,
    description: 'Scene has been successfully updated.',
    type: UpdateResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'Scene not found',
  })
  updateOne(
    @Param('storyId') storyId: string,
    @Param('id') id: string,
    @Body() updateSceneDto: UpdateSceneDto,
  ) {
    return this.sceneCrudService.update(+storyId, +id, updateSceneDto);
  }

  // Delete one scene
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a scene by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Scene ID' })
  @ApiResponse({
    status: 200,
    description: 'Scene has been successfully deleted.',
    type: DeleteResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'Scene not found',
  })
  deleteOne(@Param('storyId') storyId: string, @Param('id') id: string) {
    return this.sceneCrudService.delete(+storyId, +id);
  }
}
