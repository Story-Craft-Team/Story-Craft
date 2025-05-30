import { create } from "zustand";
import { devtools, persist, subscribeWithSelector, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { SettingsStore } from "@/shared/lib/types";
import { settingsSlice } from "./slices";

export const useSettingsStore = create<SettingsStore>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...settingsSlice(...a),
        }))
      ),
      {
        name: "settings-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
