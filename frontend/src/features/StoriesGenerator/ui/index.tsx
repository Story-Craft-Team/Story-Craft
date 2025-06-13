import React from 'react';
import s from './StoriesGenerator.module.scss'
import { Story } from '@/features';
import { IStoryHeader } from '@/shared/lib';

interface Props{
    stories: IStoryHeader[] | null
}

export default function StoriesGenerator({ stories }: Props){

    if(stories === null){
        return(
            <h1>Loading...</h1>
        );
    }
    return (
        <div className={s.stories}>
			{stories.map((story, index) => <Story key={index + 1} id={story.id!} title={story.title!} author={story.author}/>)}
		</div>
    );
};