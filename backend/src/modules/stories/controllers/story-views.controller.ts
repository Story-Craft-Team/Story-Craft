import { Controller, Get, Patch, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/deffault/auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthRequest } from 'src/common/types';
import { Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { View } from '@prisma/client';
import { ViewStoryResponse } from '../responses/story-views.response';
import { StoryViewsService } from '../services/story-views.service';

@ApiTags('Story - views')
@Controller('stories/views')
export class StoryViewsController {
  constructor(private readonly storyViewsService: StoryViewsService) {}

  // Get views of the story
  @Get(':storyId')
  @ApiOperation({ summary: 'Get views of the story' })
  @ApiResponse({
    status: 200,
    description: 'Returns views of the story',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'Story not found',
  })
  getLikes(@Param('storyId') storyId: string){
    return this.storyViewsService.getViews(+storyId);
  }

  // View story
  @Patch('view/:storyId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'View a story' })
  @ApiResponse({
    status: 201,
    description: 'Story has been successfully viewed.',
    type: ViewStoryResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  likeStory(@Request() req: AuthRequest, @Param('storyId') storyId: string) {
    return this.storyViewsService.viewStory(+req.user.id, +storyId);
  }
}
