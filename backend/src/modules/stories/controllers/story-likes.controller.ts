import { Controller, Patch, Param } from '@nestjs/common';
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

@ApiTags('Story - likes')
@Controller('stories/likes')
export class StoryLikesController {
  constructor(private readonly storyLikesService: StoryLikesService) {}

  // Like story
  @Patch(':storyId/like')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Like a story' })
  @ApiResponse({
    status: 201,
    description: 'Story has been successfully liked.',
    type: LikeStoryResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  likeStory(@Request() req: AuthRequest, @Param('storyId') storyId: number) {
    return this.storyLikesService.likeStory(+req.user.id, storyId);
  }

  // Unlike story
  @Patch(':storyId/unlike')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Unlike a story' })
  @ApiResponse({
    status: 201,
    description: 'Story has been successfully unliked.',
    type: UnlikeStoryResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  unlikeStory(@Request() req: AuthRequest, @Param('storyId') storyId: number) {
    return this.storyLikesService.unlikeStory(+req.user.id, storyId);
  }
}
