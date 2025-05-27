import { useShallow } from "zustand/react/shallow";
import styles from "./RemoveSceneButton.module.scss";
import { useStore } from "@/shared/stores";

export default function RemoveSceneButton({ sceneId }: { sceneId: number }) {
  const { removeScene } = useStore(
    useShallow((state) => ({
      removeScene: state.removeScene,
    }))
  );
  return (
    <button
      onClick={() => removeScene(sceneId)}
      className={styles.removeButton}
      title="Удалить сцену"
    >
      {/* <FiX /> */}
      Удалить сцену
    </button>
  );
}
