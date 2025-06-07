import { create } from "zustand";
import { devtools, persist, subscribeWithSelector, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { AuthSlice } from "@/shared/lib/types";
import { authSlice } from "./slices";

export const useAuthStore = create<AuthSlice>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...authSlice(...a),
        }))
      ),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);