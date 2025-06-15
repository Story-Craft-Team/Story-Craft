import { ILike } from "../ILike";
import { IScene } from "../IScene";
import { IView } from "../IView";

export interface IStoryHeader {
  id: number | null;
  title: string | null;
  description: string | null;
  image: string | null;
  authorId: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  isPublic: boolean;
  authorName: string | null;
  scenes: IScene[];
  sortValue?: number;
}