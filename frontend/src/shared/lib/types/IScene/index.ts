import { IChoice } from "../IChoice";

export interface IScene {
	id: number;
	title: string;
	image?: string;
	isEnd: boolean;
	description: string;
	maxChoices: number
	choices: IChoice[];
}
