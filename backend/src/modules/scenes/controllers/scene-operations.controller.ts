import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { SceneOperationsService } from "../services/scene-operations.service";
import { JwtAuthGuard } from "src/modules/deffault/auth/guards/jwt-auth.guard";
import { changeEndResponse } from "../responses/scene-operations.response";
import { AuthRequest } from "src/common/types";
import { Request } from "@nestjs/common";
@ApiTags('Scene - crud')
@Controller('stories/:storyId/scene/:sceneId/operations')
export class SceneOperationsController {
  constructor(private readonly sceneOperationsService: SceneOperationsService) {}

  // change isEnd of scene
  @Patch('end')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'End a scene' })
  @ApiResponse({
    status: 200,
    description: 'Scene has been successfully ended.',
    type: changeEndResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  endScene(@Request() req: AuthRequest, @Param('storyId') storyId: string, @Param('sceneId') sceneId: string) {
    return this.sceneOperationsService.endScene(+req.user.id, +storyId, +sceneId);
  }
}
