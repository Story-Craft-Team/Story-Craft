'use client'

import { deleteStoryLike, getStoryLikes, getStoryLikesCount, setStoryLike } from "@/shared/api/stories/queries"
import { useState } from "react"
import { ILike } from "../../types"

export const useLikes = () => {
    const [likesCount, setLikesCount] = useState<number>()
    const [likes, setLikes] = useState<ILike[]>()

    async function getLikesCount(storyId: number) {
        const likesCount = await getStoryLikesCount(storyId)
        setLikesCount(likesCount)
        return likesCount
    }

    async function getLikes(storyId: number) {
        const likesCount = await getStoryLikes(storyId)
        setLikes(likesCount)
        return likesCount
    }

    async function setLike(storyId: number) {
        await setStoryLike(storyId)
        await getLikesCount(storyId) 
    }

    async function deleteLike(storyId: number) {
        await deleteStoryLike(storyId)
        await getLikesCount(storyId) 
    }

    return { getLikes, likes, setLike, deleteLike, getLikesCount, likesCount }
}