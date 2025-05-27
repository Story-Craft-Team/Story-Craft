import { Scene } from "@prisma/client";

export class CreateResponse {
  scene: Scene;
}

export class FindAllResponse {
  scenes: Scene[];
}

export class FindOneResponse {
  scene: Scene;
}

export class UpdateResponse {
  scene: Scene;
}

export class DeleteResponse {
  scene: Scene;
}
