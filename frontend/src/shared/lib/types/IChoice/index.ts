export interface IChoice {
	id: number;
	text: string;
	nextSceneId: number;
	access: boolean;
	sceneId: number;
	storyId: number;
}
