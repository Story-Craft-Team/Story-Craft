import { type IStoryEditor } from "@/shared/lib/types";

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
	getSceneTitle: (sceneId: number) => string;
};

export type StoryEditorSlice = IStoryEditor & StoryEditorAction;
