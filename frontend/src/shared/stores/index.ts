import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { authSlice } from "./slices";
import { storyEditorSlice } from "./slices/storyEditor";
import { Store } from "@/shared/lib/types";

export const useStore = create<Store>()(
	devtools(
		subscribeWithSelector(
			immer((...a) => ({
				...authSlice(...a),
				...storyEditorSlice(...a),
			})),
		),
	),
);
