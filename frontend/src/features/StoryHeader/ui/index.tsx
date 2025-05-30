"use client";

import { useShallow } from "zustand/react/shallow";
import styles from "./StoryHeader.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import { IStoryHeaderMode } from "@/shared/lib";
import { useState } from "react";

interface Props {             
  mode?: IStoryHeaderMode;
}

export default function StoryHeader({ mode = "read" }: Props) {
  const {
    title,
    description,
    scenes,

    setTitle,
    setDescription,
  } = useStoryEditorStore(useShallow((state) => state));

  const [editable] = useState(mode === "editor");

  return (
    <div className={styles.container}>
      {editable ? (
        <div className={styles.titleRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="story-title" className={styles.label}>
              Название истории
            </label>
            <input
              id="story-title"
              type="text"
              className={styles.titleInput}
              aria-label="Название истории"
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Название истории"
            />
          </div>
          <div className={styles.sceneCount}>
            Количество сцен: {scenes.length}
          </div>
        </div>
      ) : (
        <div className={styles.titleRow}>
          <h2 className={styles.titleText}>{title || "Название истории..."}</h2>
          <div className={styles.sceneCount_read}>
            Количество сцен: {scenes.length}
          </div>
        </div>
      )}

      {editable && (
        <div className={styles.inputGroup}>
          <label htmlFor="story-description" className={styles.label}>
            Описание истории
          </label>
          <textarea
            id="story-description"
            className={styles.description}
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание истории"
            aria-label="Описание истории"
          />
        </div>
      )}
    </div>
  );
}
