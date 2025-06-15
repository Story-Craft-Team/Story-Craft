import { create } from "zustand";
import { devtools, persist, subscribeWithSelector, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createReadingStoriesSlice, ReadingStoriesSlice } from "./slices";

export const useReadingStoriesStore = create<ReadingStoriesSlice>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer(createReadingStoriesSlice)
      ),
      {
        name: "reading-stories-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);