import { Scene } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class changeEndResponse {

  @ApiProperty({ description: 'Scene', example: {
    id: 1,
    title: 'Scene 1',
    image: 'https://example.com/scene1.jpg',
    isEnd: true,
    storyId: 1,
    description: 'Description of scene 1',
    choices: [],
    maxChoices: 1,
  } })
  scene: Scene;
}