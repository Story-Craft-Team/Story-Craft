'use client'

import React from 'react';
import s from './SceneGenerator.module.scss'
import { useStoryEditorStore } from '@/shared/stores';
import { useShallow } from 'zustand/shallow';
import { SceneCard } from '@/entities';

export default function SceneGenerator(){
    const { scenes, addNewScene } = useStoryEditorStore(
        useShallow((state) => state)
    );
    return (
        <>
            {scenes.map((scene) => (
                <SceneCard key={scene.id} scene={scene} />
            ))}

            <button onClick={addNewScene} className={s.addSceneButton}>
                Добавить сцену
            </button>
        </>
    );
};