import { IChoice, StoryEditorSlice, StoryEditorStore } from "@/shared/lib/types";
import { StateCreator } from "zustand";

export const storyEditorSlice: StateCreator<
  StoryEditorStore,
  [["zustand/immer", never]],
  [],
  StoryEditorSlice
> = (set, get) => ({
  // state
  id: null,
  title: null,
  description: null,
  image: null,
  authorId: null,
  createdAt: null,
  updatedAt: null,
  isPublic: false,
  scenes: [],

  // actions
  setId: (id) => set({ id }),
  setTitle: (title) => set({ title }),
  setAuthorId: (authorId) => set({ authorId }),
  setDescription: (description) => set({ description }),
  setImage: (image) => set({ image }),
  setIsPublic: (isPublic) => set({ isPublic }),
  setScenes: (scenes) => set({ scenes }),

  addNewScene: () => {
    const scenes = get().scenes;
    const nextId = Math.max(0, ...scenes.map((s) => s.id)) + 1;

    set((state) => ({
      scenes: [
        ...state.scenes,
        {
          id: nextId,
          title: "",
          description: "",
          image: "",
          isEnd: false,
          maxChoices: 0,
          choices: [{ id: 1, text: "", nextSceneId: 0, access: true }],
        },
      ],
    }));
  },

  removeScene: (sceneId) =>
    set({
      scenes: get().scenes.filter((scene) => scene.id !== sceneId),
    }),

  setSceneTitle: (sceneId, title) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, title } : scene
      ),
    }),

  setSceneDescription: (sceneId, description) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, description } : scene
      ),
    }),
    
  setSceneIsEnd: (sceneId, isEnd) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, isEnd } : scene
      ),
    }),

  setSceneMaxChoices: (sceneId, maxChoices) =>
    set((state) => {
      const scene = state.scenes.find((s) => s.id === sceneId);
      if (!scene) return state;

      let updatedChoices = [...scene.choices];

      const withText = updatedChoices.filter((c) => c.text?.trim());
      const withoutText = updatedChoices.filter((c) => !c.text?.trim());

      if (withText.length >= maxChoices) {
        updatedChoices = withText.slice(0, maxChoices);
      } else {
        updatedChoices = [
          ...withText,
          ...withoutText.slice(0, maxChoices - withText.length),
        ];
      }

      return {
        scenes: state.scenes.map((s) =>
          s.id === sceneId ? { ...s, maxChoices, choices: updatedChoices } : s
        ),
      };
    }),

  setSceneImage: (sceneId, image) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, image } : scene
      ),
    }),

  addNewChoice: (sceneId) =>
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
                  nextSceneId: 0,
                  access: true,
                  sceneId: sceneId,
                  storyId: get().id,
                } as IChoice,
              ],
            }
          : scene
      ),
    }),

  removeChoice: (sceneId, choiceId) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              choices: scene.choices.filter((choice) => choice.id !== choiceId),
            }
          : scene
      ),
    }),

  setChoiceText: (sceneId: number, choiceId: number, text: string) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              choices: scene.choices.map((choice) =>
                choice.id === choiceId ? { ...choice, text } : choice
              ),
            }
          : scene
      ),
    }),

  setChoiceNextSceneId: (sceneId, choiceId, nextSceneId) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              choices: scene.choices.map((choice) =>
                choice.id === choiceId
                  ? { ...choice, nextSceneId }
                  : choice
              ),
            }
          : scene
      ),
    }),

  setChoiceAccess: (sceneId, choiceId, access) =>
    set({
      scenes: get().scenes.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              choices: scene.choices.map((choice) =>
                choice.id === choiceId ? { ...choice, access } : choice
              ),
            }
          : scene
      ),
    }),
});

// TODO: Вынести в разные слайсы