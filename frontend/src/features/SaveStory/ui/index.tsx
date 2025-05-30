import s from "./Header.module.scss";

export default function SaveStory() {
	return (
		<button
		className={`${s.controlButton} ${s.save}`}
		onClick={() => console.log("Сохранено")} // TODO: Сделать взаимодействие с API
	>
		Сохранить
	</button>
	);
}
