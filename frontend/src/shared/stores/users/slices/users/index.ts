import { UsersSlice, UsersStore } from "@/shared/lib";
import { StateCreator } from "zustand";

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
});
