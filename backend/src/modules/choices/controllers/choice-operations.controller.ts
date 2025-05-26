import { ApiTags } from '@nestjs/swagger';
import { Body, Param, Controller } from '@nestjs/common';
import { ChoiceOperationsService } from '../services/choice-operations.service';
import { SetNextSceneIdResponse } from '../responses/choice-operations.response';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/deffault/auth/guards/jwt-auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { Patch } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { SetNextSceneIdDto } from '../dto/set-next-scene-id.dto';

@ApiTags('Choice - operations')
@Controller('stories/:storyId/scene/:sceneId/choices/:choiceId/operations')
export class ChoiceOperationsController {
  constructor(
    private readonly choiceOperationsService: ChoiceOperationsService,
  ) {}

  // set nextSceneId
  @Patch('next-scene-id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a single choice by ID' })
  @ApiParam({ name: 'choiceId', type: 'string', description: 'Choice ID' })
  @ApiBody({ type: SetNextSceneIdDto })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated choice',
    type: SetNextSceneIdResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'Choice not found',
  })
  async setNextSceneId(
    @Param('storyId') storyId: string,
    @Param('sceneId') sceneId: string,
    @Param('choiceId') choiceId: string,
    @Body() body: SetNextSceneIdDto,
  ) {
    return this.choiceOperationsService.setNextSceneId(
      +storyId,
      +sceneId,
      +choiceId,
      body.nextSceneId,
    );
  }
}
