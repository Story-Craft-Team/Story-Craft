import { IUser } from "@/shared/lib";

export type AuthSlice = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}