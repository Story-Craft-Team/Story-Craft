'use client'

import { usePathname } from "next/navigation";
import { useState } from "react";
import { IScene } from "../../types";

export const useScene = () => {
    const pathname = usePathname();
    const [sceneContent, setSceneContent] = useState({
        id: 1,
        title: "Печальная история в маинкрафт",
        isEnd: false,
        storyId: 1,
        description: "Перед тобой нубик в майнкрафте и хакер в майнкрафте у тебя 5 блоков, ровно столько чтобы проложить путь чтобы не упали в лаву. Но спасти можешь только одного! Кого спасешь?",
        choices: [
            {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
            {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
            {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
            {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
            {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
            {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
        ]
    })

    const getScene = () => {
        const sceneId = pathname.split('/')[3]
        const storyId = pathname.split('/')[2]
        //отправка на бек запрос на историю `read/${storyId}/${sceneId}`
        return sceneContent as IScene
    }

    return {getScene}
}