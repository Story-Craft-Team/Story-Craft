'use client'

import { useState } from "react";
import { IStoryHeader } from "../../types";
import { getAllStories } from "@/shared/api/stories/queries";

export const useStories = () => {
    const [stories, setStories] = useState<IStoryHeader[]>([])
    
    async function getStories() {
        const response = await getAllStories();
        setStories(response)
        return stories as IStoryHeader[]
    }

    return { getStories, stories }
};