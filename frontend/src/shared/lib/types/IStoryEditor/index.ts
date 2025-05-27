import { IScene } from "../";

export interface IStoryEditor {
  title: string;
  author: string;
  authorId: string;
  description: string;
  image: string;
  isPublic: boolean;
  scenes: IScene[];
}
