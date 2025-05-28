import { Controller, Get, Patch, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/deffault/auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthRequest } from 'src/common/types';
import { StoryLikesService } from '../services/story-likes.service';
import { Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import {
  LikeStoryResponse,
  UnlikeStoryResponse,
} from '../responses/story-likes.response';
import { Like } from '@prisma/client';

@ApiTags('Story - likes')
@Controller('stories/likes')
export class StoryLikesController {
  constructor(private readonly storyLikesService: StoryLikesService) {}

  // Get likes of the story
  @Get(':storyId')
  @ApiOperation({ summary: 'Get likes of the story' })
  @ApiResponse({
    status: 200,
    description: 'Returns likes of the story',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 404,
    description: 'Story not found',
  })
  getLikes(@Param('storyId') storyId: string): Promise<{ likes: Like[] }> {
    return this.storyLikesService.getLikes(+storyId);
  }

  // Like story
  @Patch('like/:storyId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Like a story' })
  @ApiResponse({
    status: 201,
    description: 'Story has been successfully liked.',
    type: LikeStoryResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  likeStory(@Request() req: AuthRequest, @Param('storyId') storyId: string) {
    return this.storyLikesService.likeStory(+req.user.id, +storyId);
  }

  // Unlike story
  @Patch('unlike/:storyId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Unlike a story' })
  @ApiResponse({
    status: 201,
    description: 'Story has been successfully unliked.',
    type: UnlikeStoryResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  unlikeStory(@Request() req: AuthRequest, @Param('storyId') storyId: string) {
    return this.storyLikesService.unlikeStory(+req.user.id, +storyId);
  }
}
