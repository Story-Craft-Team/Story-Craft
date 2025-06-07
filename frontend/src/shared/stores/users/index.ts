import { create } from "zustand";
import { devtools, persist, subscribeWithSelector, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { UsersSlice } from "@/shared/lib/types";
import { usersSlice } from "./slices";

export const useUsersStore = create<UsersSlice>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...usersSlice(...a),
        }))
      ),
      {
        name: "users-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
