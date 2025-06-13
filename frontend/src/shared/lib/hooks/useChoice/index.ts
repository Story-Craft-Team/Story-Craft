'use client'

import { useRouter } from "next/navigation";

export const useChoice = () => {
    const router = useRouter();

    const nextSceneLoad = (StoryId: number, SceneId: number) => {
        router.push(`/read/${StoryId}/${SceneId}`);
        //Запросы на бек по поводу след сцены
    };

    return { nextSceneLoad };
};