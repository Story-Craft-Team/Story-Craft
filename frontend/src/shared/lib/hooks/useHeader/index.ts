'use client'

import { useState } from "react"
import { IStoryHeader } from "@/shared/lib"
import { usePathname } from "next/navigation"
import { getOneStory } from "@/shared/api/stories/queries"

export const useHeader = () => {
    const pathname  = usePathname()
    const [story, setStory] = useState<IStoryHeader>()

    const getStory = async () => {
        const response = await getOneStory(+pathname.split('/')[2])
        setStory(response)
    }

    return {getStory, story}
}