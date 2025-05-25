import { Store, StoryEditorSlice } from "@/common/lib/types";
import { StateCreator } from "zustand";

export const storyEditorSlice: StateCreator<
	Store,
	[["zustand/immer", never]],
	[],
	StoryEditorSlice
> = (set, get) => ({
	title: "",
	author: "",
	authorId: "",
	description: "",
	image: "",
	isPublic: false,
	scenes: [],

	setTitle: (title) => set({ title }),
	setAuthor: (author) => set({ author }),
	setAuthorId: (authorId) => set({ authorId }),
	setDescription: (description) => set({ description }),
	setImage: (image) => set({ image }),
	setIsPublic: (isPublic) => set({ isPublic }),
	setScenes: (scenes) => set({ scenes }),

	addNewScene: () =>
		set({
			scenes: [
				...get().scenes,
				{
					id: get().scenes.length + 1,
					title: "",
					description: "",
					image: "",
					isEnd: false,
					choices: [{ id: 1, text: "", nextScene: 0, access: true }],
				},
			],
		}),

	addNewChoice: (sceneId: number) =>
		set({
			scenes: get().scenes.map((scene) =>
				scene.id === sceneId
					? {
							...scene,
							choices: [
								...scene.choices,
								{
									id: scene.choices.length + 1,
									text: "",
									nextScene: 0,
									access: true,
								},
							],
						}
					: scene,
			),
		}),

	setSceneTitle: (sceneId: number, title: string) =>
		set({
			scenes: get().scenes.map((scene) =>
				scene.id === sceneId
					? {
							...scene,
							title,
						}
					: scene,
			),
		}),

	getSceneTitle: (sceneId: number) =>
		get().scenes.find((scene) => scene.id === sceneId)?.title || "",
});
