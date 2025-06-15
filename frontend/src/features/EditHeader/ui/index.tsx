import React from 'react';
import s from './EditableHeader.module.scss'
import { useStoryEditorStore } from '@/shared/stores';
import { useShallow } from 'zustand/shallow';

export default function EditHeader(){

    const {
        title,
        description,
        scenes,
    
        setTitle,
        setDescription,
    } = useStoryEditorStore(useShallow((state) => state));

    return (
        <div className={s.container}>
          <div className={s.titleRow}>
            <div className={s.inputGroup}>
              <label htmlFor="story-title" className={s.label}>
                Название истории
              </label>
              <input
                id="story-title"
                type="text"
                className={s.titleInput}
                aria-label="Название истории"
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название истории"
              />
              </div>
              <div className={s.scenesCount}>
                Количество сцен: {scenes.length}
              </div>
            </div>
            <div className={s.inputGroup}>
            <label htmlFor="story-description" className={s.label}>
              Описание истории
            </label>
            <textarea
              id="story-description"
              className={s.description_edit}
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание истории"
              aria-label="Описание истории"
            />
          </div>
        </div>
    );
};