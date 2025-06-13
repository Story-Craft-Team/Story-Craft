import React, { ReactNode } from 'react';
import s from './ChoiceCard.module.scss'
import { useChoice } from '@/shared/lib/hooks/useChoice';

interface Props{
    access?: boolean;
    children: ReactNode;
    StoryId: number;
    nextSceneId: number;
}

export default function ReadChoiceCard({ access, children, nextSceneId, StoryId}: Props){
    const { nextSceneLoad } = useChoice()
    return (
        <div 
            data-value={nextSceneId}
            className={access? s.hasAccess : s.noneAccess}
            onClick={() => nextSceneLoad(StoryId, nextSceneId) }
        >
            {children}
        </div>
    );
};
