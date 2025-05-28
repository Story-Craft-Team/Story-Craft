import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/deffault/auth/guards/jwt-auth.guard';
import { StoryOperationsService } from '../services/story-operations.service';
import { AuthRequest } from 'src/common/types';

@ApiTags('Story - operations')
@Controller('stories/operations')
export class StoryOperationsController {
  constructor(
    private readonly storyOperationsService: StoryOperationsService,
  ) {}

  // Public story
  @Patch('public/:id')
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
  @Patch('private/:id')
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
