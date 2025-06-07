import { UsersSlice, UsersStore } from "@/shared/lib";
import { StateCreator } from "zustand";
import { IUser } from "@/shared/lib/types";

export const usersSlice: StateCreator<
  UsersStore,
  [["zustand/immer", never]],
  [],
  UsersSlice
> = (set) => ({
  // State
  users: [],
  currentUser: null,

  // Actions
  setUsers: (users) => set((state) => {
    state.users = users;
  }),
  setCurrentUser: (user) => set((state) => {
    state.currentUser = user;
  }),
  updateUser: (id: number, user: IUser) => set((state) => {
    state.users = state.users.map((u) => (u.id === id ? { ...u, ...user } : u));
    state.currentUser = { ...state.currentUser, ...user };
  }),
});
