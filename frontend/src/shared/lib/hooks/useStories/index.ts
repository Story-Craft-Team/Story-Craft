'use client'

import { useState, useEffect, useCallback } from 'react'
import { getAllStories, getStoriesByLimit, getStoryLikesCount } from '@/shared/api/stories/queries'
import { IStoryHeader, useLikes, useViews } from '@/shared/lib'

export const useStories = () => {
    const [stories, setStories] = useState<IStoryHeader[]>([])
    const [sortedStories, setSortedStories] = useState<IStoryHeader[]>([])
    const { getLikesCount } = useLikes()
    const { getViews } = useViews()

    const fetchAllStories = useCallback(async () => {
        try {
            const data = await getAllStories()
            return data
        } catch (error) {
            throw error
    }}, [])

    const fetchStoriesByLimit = useCallback(async (page: number = 1, limit: number = 8) => {
        try {
            const data = await getStoriesByLimit(page, limit)
            setStories(data)
            setSortedStories(data)
        } catch (error) {
            throw error
    }}, [])

    const sortStories = useCallback(async (value: string) => {
        try {
            const storiesWithData = await Promise.all(
                stories.map(async story => {
                    const data = value === 'likes' 
                        ? await getLikesCount(story.id!)
                        : await getViews(story.id!)
                    return { ...story, sortValue: data || 0 }
                })
            )

            const sorted = [...storiesWithData].sort((a, b) => b.sortValue - a.sortValue)
            setSortedStories(sorted)
        } catch (error) {
            throw error
        }
    }, [stories])

    useEffect(() => {
        fetchStoriesByLimit()
    }, [])

    return {
        stories,
        sortedStories,
        fetchStoriesByLimit,
        sortStories,
        fetchAllStories
    }
}