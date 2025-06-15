'use client'

import { getStoryViews, setStoryView } from "@/shared/api/stories/queries"
import { useState } from "react"
import { IView } from "@/shared/lib"

export const useViews = () => {
    const [views, setViews] = useState<number>()

    async function getViews(storyId: number) {
        const viewsCount = await getStoryViews(storyId)
        setViews(viewsCount)
        return viewsCount
    }

    async function setView(storyId: number) {
        await setStoryView(storyId)
        await getViews(storyId)
    }

    return { getViews, views, setView }
}