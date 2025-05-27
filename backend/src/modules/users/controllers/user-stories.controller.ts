import { Body, Controller, Param, Patch, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserStoriesService } from '../services/user-stories.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/deffault/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthRequest } from 'src/common/types';
import {
  GetSavedStoriesResponse,
  GetLikedStoriesResponse,
} from '../responses/user-stories.response';

// edit a array of stories of user
@ApiTags('User - stories')
@Controller('users/stories')
export class UserStoriesController {
  constructor(private readonly userStoriesService: UserStoriesService) {}

  // Get all seved stories of user
  @Get('saved')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all seved stories of user' })
  @ApiResponse({
    status: 200,
    description: 'Stories has been successfully retrieved.',
    type: GetSavedStoriesResponse,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  getSavedStories(@Request() req: AuthRequest) {
    return this.userStoriesService.getSavedStories(+req.user.id);
  }

  // Get all liked stories of user
  @Get('liked')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all liked stories of user' })
  @ApiResponse({
    status: 200,
    description: 'Stories has been successfully retrieved.',
    type: GetLikedStoriesResponse,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  getLikedStories(@Request() req: AuthRequest) {
    return this.userStoriesService.getLikedStories(+req.user.id);
  }
}
