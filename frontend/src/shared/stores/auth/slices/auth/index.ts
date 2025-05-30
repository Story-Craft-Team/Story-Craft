import { AuthSlice, AuthStore } from "@/shared/lib";
import { StateCreator } from "zustand";

export const authSlice: StateCreator<
  AuthStore,
  [["zustand/immer", never]],
  [],
  AuthSlice
> = (set, get) => ({
  // State
  user: null,

  // Actions
  setUser: (user) => set({ user }),
});
