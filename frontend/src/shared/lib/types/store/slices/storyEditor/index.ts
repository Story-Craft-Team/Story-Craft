import { IStoryEditor } from "../../../IStoryEditor";

type StoryEditorAction = {
  setTitle: (title: IStoryEditor["title"]) => void;
  setAuthor: (author: IStoryEditor["author"]) => void;
  setAuthorId: (authorId: IStoryEditor["authorId"]) => void;
  setDescription: (description: IStoryEditor["description"]) => void;
  setImage: (image: IStoryEditor["image"]) => void;
  setIsPublic: (isPublic: IStoryEditor["isPublic"]) => void;
  setScenes: (scenes: IStoryEditor["scenes"]) => void;

  addNewScene: () => void;
  addNewChoice: (sceneId: number) => void;

  setSceneTitle: (sceneId: number, title: string) => void;
  setSceneDescription: (sceneId: number, description: string) => void;
  setSceneIsEnd: (sceneId: number, isEnd: boolean) => void;
  setSceneMaxChoices: (sceneId: number, maxChoices: number) => void;
  
  setSceneImage: (sceneId: number, image: string) => void;

  setChoiceText: (sceneId: number, choiceId: number, text: string) => void;
  setChoiceNextSceneId: (
    sceneId: number,
    choiceId: number,
    nextSceneId: number
  ) => void;
  setChoiceAccess: (sceneId: number, choiceId: number, access: boolean) => void;

  removeScene: (sceneId: number) => void;
  removeChoice: (sceneId: number, choiceId: number) => void;

};

export type StoryEditorSlice = IStoryEditor & StoryEditorAction;
