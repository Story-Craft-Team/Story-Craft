"use client";

import { useShallow } from "zustand/react/shallow";
import s from "./StoryHeader.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IStoryHeader, IStoryHeaderMode } from "@/shared/lib";
import { getOneStory } from "@/shared/api/stories/queries";
import { usePathname } from "next/navigation";

interface Props{
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

  const pathname  = usePathname()
  const [editable] = useState(mode === "editor");

  const [story, setStory] = useState<IStoryHeader>()

  useEffect(() => {
    const getStory = async () => {
      const response = await getOneStory(+pathname.split('/')[2])
      setStory(response)
    }
    if(mode === "read")
      getStory()
  }, [])
  return (
    <>
      {editable ? (
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
      ) : story && (
        <div className={s.container}>
          <div className={s.titleRow}>
            <h2 className={s.titleText}>{story!.title}</h2>
            <h2 className={s.scenesCount}>Количество сцен: {story.scenes.length}</h2>
          </div>
          <div className={s.imgContainer}>
            <img className={s.img} src="/story.jfif"/>
            <h3 className={s.description}>{story!.description}</h3>
          </div>
          <div className={s.btnContainer}>
            <Link href={`/read/${story!.id}/1`}><button className={s.btn}>Читать</button></Link>
          </div>
        </div>
      )}
    </>
  );
}
