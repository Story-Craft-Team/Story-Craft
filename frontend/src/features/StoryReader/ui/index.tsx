'use client'

import React, { useEffect } from 'react';
import s from './StoryReader.module.scss'
import { ChoicesGenerator } from '@/features';
import { usePathname } from 'next/navigation';
import { useScene } from '@/shared/lib/hooks/useScene';
import { useHeader } from '@/shared/lib';
import IsEndCards from '@/entities/IsEndCards/ui';

export default function StoryReader() {
    const pathname = usePathname();
    const { getScene, scene } = useScene()
    const { getStory, story } = useHeader()

    useEffect(() => {
        getScene()
        getStory()
    }, [pathname]);

    if (scene === null) {
        return (
            <h1>Loading...</h1>
        )
    }

    if (scene.isEnd) {
        return (
            <div className={s.container}>
                <div className={s.titleRow}>
                    <h2> {story?.title} </h2>
                    <h2>Сцена: {story?.scenes.findIndex(storyScene => storyScene.id === scene.id)! + 1}</h2>
                </div>
                <div className={s.questionBody}>
                    <h2>{scene.title}</h2>
                    <h3>{scene.description}</h3>
                </div>
                <IsEndCards/>
            </div>
        );
    }

    return (
        <div className={s.container}>
            <div className={s.titleRow}>
                <h2> {story?.title} </h2>
                <h2>Сцена: {story?.scenes.findIndex(storyScene => storyScene.id === scene.id)! + 1}</h2>
            </div>
            <div className={s.questionBody}>
                <h2>{scene.title}</h2>
                <h3>{scene.description}</h3>
            </div>
            <ChoicesGenerator choices={scene.choices} />
        </div>
    );
};