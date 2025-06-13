import React from 'react';
import s from './ChoicesGenerator.module.scss'
import { ReadChoiceCard } from '@/entities';
import { IChoice } from '@/shared/lib';

interface Props{
    choices: IChoice[]
}

export default function ChoicesGenerator({ choices }: Props){
    return (
        <div className={s.answersBody}>
            {choices.map((choice, index) => <ReadChoiceCard key={index + 1} StoryId={choice.storyId} nextSceneId={choice.nextSceneId} access={choice.access}>{choice.text}</ReadChoiceCard>)}
        </div>
    );
};