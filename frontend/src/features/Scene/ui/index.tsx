"use client";

import TextInput from "@/entities/TextInput/ui";
import s from "./Scene.module.scss";
import { ChoiceInput } from "@/entities";
import { useState } from "react";
import { MAX_NUM_CHOICES } from "@/shared/lib/constants";

interface Props {
	id: number;
}

export default function Scene({ id }: Props) {
	const [choices, setChoices] = useState<string[]>([]);

	const addChoice = () => {
		if (choices.length >= MAX_NUM_CHOICES) return;
		setChoices([...choices, "1"]);
	};

	return (
		<div className={s.sceneiner}>
			<div className={s.scene_title}>
				<h2>Scene {id}</h2>
			</div>
			<div className={s.scene}>
				<TextInput id={id} />
				<div className={s.actions_container}>
					<div className={s.actions}>
						{choices.map((choice, index) => (
							<ChoiceInput key={index} />
						))}
					</div>
					<button onClick={addChoice} className={s.add_action}>
						Add Choice
					</button>
				</div>
			</div>
		</div>
	);
}
