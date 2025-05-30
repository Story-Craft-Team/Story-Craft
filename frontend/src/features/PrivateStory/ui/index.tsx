import s from "./Header.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import { useShallow } from "zustand/react/shallow";

export default function PrivateStory() {
	const { isPublic, setIsPublic } = useStoryEditorStore(
		useShallow((state) => state)
	);

	return (
		<button
		className={`${s.controlButton} ${s.unpublish} ${
			!isPublic ? s.disabled : ""
		}`}
		onClick={() => setIsPublic(false)}
		disabled={!isPublic}
	>
		Отменить публикацию
	</button>
	);
}
