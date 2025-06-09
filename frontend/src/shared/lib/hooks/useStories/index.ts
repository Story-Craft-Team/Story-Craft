'use client'

import { useState } from "react";
import { IStoryHeader } from "../../types";

export const useStories = () => {
    const [stories, setStories] = useState([
        {
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
                        {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
                        {id: 1, text: "нафик их", access: true, nextSceneId: 5, storyId: 1, sceneId: 1},
                    ]
                },
            ],
        },
    ])
    
    function getAllStories() {
        //получениее историй из бека в setStories
        return stories as IStoryHeader[]
    }

    return { getAllStories }
};