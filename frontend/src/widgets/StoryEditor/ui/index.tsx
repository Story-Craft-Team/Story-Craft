"use client";
import { SceneCard } from "@/entities";
import { useShallow } from "zustand/react/shallow";
import styles from "./StoryEditor.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import { SaveStory, PublicStory, PrivateStory } from "@/features";

export default function StoryEditor() {
  const { scenes, addNewScene } = useStoryEditorStore(
    useShallow((state) => state)
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
        <SaveStory />

        <PublicStory />

        <PrivateStory />
      </div>
    </div>
  );
}
