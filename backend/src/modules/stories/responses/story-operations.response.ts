import { ApiProperty } from "@nestjs/swagger";
import { Story } from "@prisma/client";

export class GetLengthResponse {
 
  @ApiProperty({
    description: 'Length of the story',
    example: 3,
  })
  lengthScenes: number;
}

export class PublicStoryResponse {
  @ApiProperty({
    description: 'Story has been successfully made public.',
  })
  story: Story;
}

export class PrivateStoryResponse {
  @ApiProperty({
    description: 'Story has been successfully made private.',
  })
  story: Story;
}
