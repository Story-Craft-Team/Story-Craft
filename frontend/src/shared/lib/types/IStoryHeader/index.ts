import { IScene } from "../IScene";

export interface IStoryHeader {
  id: number | null;
  title: string | null;
  description: string | null;
  image: string | null;
  authorId: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  isPublic: boolean;
  scenes: IScene[];
}