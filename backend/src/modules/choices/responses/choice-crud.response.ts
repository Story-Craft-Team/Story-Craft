import { Choice } from "@prisma/client";

export class CreateResponse {
  choice: Choice;
}

export class FindAllResponse {
  choices: Choice[];
}

export class FindOneResponse {
  choice: Choice;
}

export class UpdateResponse {
  choice: Choice;
}

export class DeleteResponse {
  choice: Choice;
}