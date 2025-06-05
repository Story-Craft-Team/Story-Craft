import { AuthSlice, AuthStore } from "@/shared/lib";
import { StateCreator } from "zustand";

export const authSlice: StateCreator<
  AuthStore,
  [["zustand/immer", never]],
  [],
  AuthSlice
> = (set) => ({
  // State
  user: null,
  isAuth: false, // начальное значение

  // Actions
  setUser: (user) => set((state) => {
    state.user = user;
    state.isAuth = !!user;
  }),
  setIsAuth: (isAuth) => set({ isAuth }),
});
