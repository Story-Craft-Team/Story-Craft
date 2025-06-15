import React from 'react';
import s from './ChoicesGenerator.module.scss';
import { ReadChoiceCard } from '@/entities';
import { IChoice } from '@/shared/lib';

interface Props {
    choices: IChoice[],
}

export default function ChoicesGenerator({ choices }: Props) {
    const chunkedChoices = [];
    for (let i = 0; i < choices.length; i += 3) {
        chunkedChoices.push(choices.slice(i, i + 3));
    }

    return (
        <div className={s.choicesContainer}>
            {chunkedChoices.map((chunk, chunkIndex) => (
                <div 
                    key={`chunk-${chunkIndex}`} 
                    className={`${s.answersBody}`}
                >
                    {chunk.map((choice, index) => (
                        <ReadChoiceCard 
                            key={`${chunkIndex}-${index}`} 
                            StoryId={choice.storyId} 
                            nextSceneId={choice.nextSceneId} 
                            access={choice.access}
                        >
                            {choice.text}
                        </ReadChoiceCard>
                    ))}
                </div>
            ))}
        </div>
    );
};