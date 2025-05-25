import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Param, Request, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { StoryOperationsService } from '../services/story-operations.service';
import { GetLengthResponse } from '../responses/story-operations.response';
import { Story } from '@prisma/client';
import { AuthRequest } from 'src/common/types';

@ApiTags('Story Operations')
@Controller('stories/operations')
export class StoryOperationsController {
  constructor(
    private readonly storyOperationsService: StoryOperationsService,
  ) {}

  // Get length
  @Get(':id/length')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the length of stories' })
  @ApiResponse({
    status: 200,
    description: 'Returns the length of stories',
    type: GetLengthResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  getLength(@Param('id') id: string) {
    return this.storyOperationsService.getLength(+id);
  }

  // Public story
  @Get(':id/public')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Make a story public' })
  @ApiResponse({
    status: 200,
    description: 'Story has been successfully made public.',
  })
  @ApiResponse({ status: 404, description: 'Story not found' })
  publicStory(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.storyOperationsService.publicStory(+req.user.id, +id);
  }

  // Private story
  @Get(':id/private')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Make a story private' })
  @ApiResponse({
    status: 200,
    description: 'Story has been successfully made private.',
  })
  @ApiResponse({ status: 404, description: 'Story not found' })
  privateStory(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.storyOperationsService.privateStory(+req.user.id, +id);
  }
}
