import { IScene } from "../";

export interface IStoryEditor {
  id: number | null;
  title: string | null;
  description: string | null;
  image: string | null;
  authorId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  isPublic: boolean;
  scenes: IScene[];
}
