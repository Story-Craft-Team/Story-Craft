"use client";
import { SceneCard } from "@/entities";
import { useShallow } from "zustand/react/shallow";
import styles from "./StoryEditor.module.scss";
import { useStore } from "@/shared/stores";

export default function StoryEditor() {
  const { scenes, addNewScene, setIsPublic, isPublic } = useStore(
    useShallow((state) => ({
      scenes: state.scenes,
      addNewScene: state.addNewScene,
      setIsPublic: state.setIsPublic,
      isPublic: state.isPublic,
    }))
  );

  return (
    <div className={styles.container}>
      {scenes.map((scene) => (
        <SceneCard key={scene.id} scene={scene} />
      ))}

      <button onClick={addNewScene} className={styles.addSceneButton}>
        Добавить сцену
      </button>

      <div className={styles.controls}>
        <button
          className={`${styles.controlButton} ${styles.save}`}
          onClick={() => console.log("Сохранено")}
        >
          Сохранить
        </button>

        <button
          className={`${styles.controlButton} ${styles.publish} ${
            isPublic ? styles.disabled : ""
          }`}
          onClick={() => setIsPublic(true)}
          disabled={isPublic}
        >
          Опубликовать
        </button>

        <button
          className={`${styles.controlButton} ${styles.unpublish} ${
            !isPublic ? styles.disabled : ""
          }`}
          onClick={() => setIsPublic(false)}
          disabled={!isPublic}
        >
          Отменить публикацию
        </button>
      </div>
    </div>
  );
}
// TODO когда будет апи - то вынести 3 кнопки действия отдельно в features (наверно)
