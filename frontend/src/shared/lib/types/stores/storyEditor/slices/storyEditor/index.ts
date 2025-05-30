import { IStoryEditor } from "@/shared/lib";

export type StoryEditorActions = {
  // Story Actions
  setId: (id: IStoryEditor["id"]) => void;
  setTitle: (title: IStoryEditor["title"]) => void;
  setAuthorId: (authorId: IStoryEditor["authorId"]) => void;
  setDescription: (description: IStoryEditor["description"]) => void;
  setImage: (image: IStoryEditor["image"]) => void;
  setIsPublic: (isPublic: IStoryEditor["isPublic"]) => void;
  setScenes: (scenes: IStoryEditor["scenes"]) => void;

  // Scene Actions
  addNewScene: () => void;
  removeScene: (sceneId: number) => void;

  setSceneTitle: (sceneId: number, title: string) => void;
  setSceneDescription: (sceneId: number, description: string) => void;
  setSceneIsEnd: (sceneId: number, isEnd: boolean) => void;
  setSceneMaxChoices: (sceneId: number, maxChoices: number) => void;
  setSceneImage: (sceneId: number, image: string) => void;

  // Choice Actions
  addNewChoice: (sceneId: number) => void;
  removeChoice: (sceneId: number, choiceId: number) => void;
  setChoiceText: (
    sceneId: number,
    choiceId: number,
    text: string
  ) => void;
  setChoiceNextSceneId: (
    sceneId: number,
    choiceId: number,
    nextSceneId: number
  ) => void;
  setChoiceAccess: (
    sceneId: number,
    choiceId: number,
    access: boolean
  ) => void;
};

export type StoryEditorSlice = IStoryEditor & StoryEditorActions;
