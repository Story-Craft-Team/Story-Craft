import s from "./Header.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import { useShallow } from "zustand/react/shallow";

export default function PublicStory() {
	const {
		isPublic,
		setIsPublic,
	} = useStoryEditorStore(useShallow((state) => state));

	return (
		<button
		className={`${s.controlButton} ${s.publish} ${
			isPublic ? s.disabled : ""
		}`}
		onClick={() => setIsPublic(true)}
		disabled={isPublic}
	>
		Опубликовать
	</button>
	);
}
