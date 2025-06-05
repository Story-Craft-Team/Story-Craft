import { IUser } from "@/shared/lib";

export type AuthSlice = {
  // State
  user: IUser | null;
  isAuth: boolean;

  // Actions
  setUser: (user: IUser | null) => void;
  setIsAuth: (isAuth: boolean) => void;
}