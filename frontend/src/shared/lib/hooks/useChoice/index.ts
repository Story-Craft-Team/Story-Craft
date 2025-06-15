'use client'

import { useUsersStore } from "@/shared/stores";
import { useReadingStoriesStore } from "@/shared/stores/readingStories";
import { useRouter } from "next/navigation";

export const useChoice = () => {
    const router = useRouter();
    const {startAndUpdateStory} = useReadingStoriesStore()
    const { currentUser } = useUsersStore()
    const nextSceneLoad = (StoryId: number, SceneId: number) => {
        startAndUpdateStory(StoryId, currentUser!.id, SceneId)
        router.push(`/read/${StoryId}/${SceneId}`);
    };

    return { nextSceneLoad };
};