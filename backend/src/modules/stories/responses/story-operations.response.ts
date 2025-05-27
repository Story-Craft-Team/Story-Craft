import { ApiProperty } from "@nestjs/swagger";
import { Story } from "@prisma/client";

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
