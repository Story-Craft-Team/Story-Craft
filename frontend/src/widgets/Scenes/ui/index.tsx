"use client";

import { Scene } from "@/features";
import s from "./Scenes.module.scss";
import { useShallow } from "zustand/shallow";
import { useStore } from "@/shared/stores";

interface SceneType {
  id: number;
}

export default function Scenes() {
	const { scenes, addNewScene } = useStore(useShallow((state) => state));

	const addSceneSubmit = () => {
		addNewScene();
	};

	return (
		<div className={s.scenes}>
			{scenes.map((scene: SceneType) => (
				<Scene key={scene.id} id={scene.id} />
			))}
			<button onClick={addSceneSubmit} className={s.add_scene}>
				Add Scene
			</button>
		</div>
	); // Later need to get an ID from the store
}
