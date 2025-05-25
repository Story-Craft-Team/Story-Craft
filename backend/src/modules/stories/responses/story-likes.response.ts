import { ApiProperty } from "@nestjs/swagger";
import { Like, Story } from "@prisma/client";

export class LikeStoryResponse {


  like: Like;
}

export class UnlikeStoryResponse {

  like: Like;
}


