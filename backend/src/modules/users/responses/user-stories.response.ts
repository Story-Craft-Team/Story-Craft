import { Story } from "@prisma/client";

export class GetSavedStoriesResponse {
  stories: Story[];
}

export class GetLikedStoriesResponse {
  stories: Story[];
}
