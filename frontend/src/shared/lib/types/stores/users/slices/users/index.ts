import { IUser } from "@/shared/lib";

export type UsersState = {
  users: IUser[];
  currentUser: IUser | null;
};

export type UsersActions = {
  setUsers: (users: IUser[]) => void;
  setCurrentUser: (user: IUser | null) => void;
  updateUser: (id: number, user: IUser) => void;
};

export type UsersSlice = UsersState & UsersActions;
