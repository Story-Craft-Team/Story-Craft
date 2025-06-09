"use client";

import { useShallow } from "zustand/react/shallow";
import s from "./StoryHeader.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IStoryHeaderMode } from "@/shared/lib";

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

  const [editable] = useState(mode === "editor");

  const [story, setStory] = useState({
    id: 1,
    title: "печальная история маинкрафт",
    description: "печальная история маинкрафт про нубика и хакера",
    image: "/story.jfif",
    createdAt: "06.06.2000",
    updatedAt: "10.10.2020",
    authorId: 2,
    isPublic: true,
    author: "Andrey",
    scenes: [
        {
            id: 1,
            title: "Печальная история в маинкрафт",
            isEnd: false,
            storyId: 1,
            maxChoices: 6,
            description: "Перед тобой нубик в майнкрафте и хакер в майнкрафте у тебя 5 блоков, ровно столько чтобы проложить путь чтобы не упали в лаву. Но спасти можешь только одного! Кого спасешь?",
            choices: [
                {id: 1, text: "нафик их", access: false, nextSceneId: 5, storyId: 1, sceneId: 1},
                {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
                {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
                {id: 1, text: "нафик их", access: false, nextSceneId: 5, storyId: 1, sceneId: 1},
                {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
                {id: 1, text: "нафик их", access: false, nextSceneId: 5, storyId: 1, sceneId: 1},
            ]
        },
        {
            id: 1,
            title: "Печальная история в маинкрафт",
            isEnd: false,
            storyId: 1,
            maxChoices: 6,
            description: "Перед тобой нубик в майнкрафте и хакер в майнкрафте у тебя 5 блоков, ровно столько чтобы проложить путь чтобы не упали в лаву. Но спасти можешь только одного! Кого спасешь?",
            choices: [
                {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
                {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
                {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
                {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
                {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
                {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
            ]
        },
    ],
  }) 

  useEffect(() => {
    //получение истории из бека
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
      ) : (
        <div className={s.container}>
          <div className={s.titleRow}>
            <h2 className={s.titleText}>{story.title}</h2>
            <h2 className={s.scenesCount}>Количество сцен: {story.scenes.length}</h2>
          </div>
          <div className={s.imgContainer}>
            <img className={s.img} src="/story.jfif"/>
            <h3 className={s.description}>{story.description}</h3>
          </div>
          <div className={s.btnContainer}>
            <Link href={`/read/${story.id}/1`}><button className={s.btn}>Читать</button></Link>
          </div>
        </div>
      )}
    </>
  );
}
