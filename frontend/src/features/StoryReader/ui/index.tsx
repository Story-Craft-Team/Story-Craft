'use client'

import React, { useEffect, useState } from 'react';
import s from './StoryReader.module.scss'
import { ChoicesGenerator } from '@/features';
import { usePathname } from 'next/navigation';
import { useScene } from '@/shared/lib/hooks/useScene';
import { IScene } from '@/shared/lib';

export default function StoryReader(){
    const pathname = usePathname();
    const { getScene } = useScene()
    const [ scene, setScene ] = useState<IScene | null>(null)

    useEffect(() => {
        setScene(getScene())
    }, [pathname]);

    if(scene === null){
        return(
            <h1>Loading...</h1>
        )
    }
    
    return (
        <div className={s.container}>
            <div className={s.titleRow}>
                <h2>Печальная история в маинкрафт</h2>
                <h2>Сцена: {scene.id}</h2>
            </div>
            <div className={s.questionBody}>
                <h2>{scene.title}</h2>
                <h3>{scene.description}</h3>
            </div>
            <ChoicesGenerator choices={scene.choices}/>
        </div>
    );
};