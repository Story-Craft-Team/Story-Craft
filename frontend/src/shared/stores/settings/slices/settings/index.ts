import { SettingsStore, SettingsSlice } from "@/shared/lib";
import { StateCreator } from "zustand";

export const settingsSlice: StateCreator<
  SettingsStore,
  [["zustand/immer", never]],
  [],
  SettingsSlice
> = (set, get) => ({
  // State
  language: "ru",
  theme: "dark",

  // Actions
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme }),
  resetSettings: () => set({ language: "ru", theme: "dark" }),
});
