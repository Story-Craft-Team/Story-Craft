'use client'

import React from 'react';
import s from './StoriesGenerator.module.scss'
import { Story } from '@/features';
import { IStoryHeader } from '@/shared/lib';
import { PaginationButtons } from '@/shared/ui';

interface Props {
    sortedStories: IStoryHeader[] | null;
    fetchStoriesByLimit: (page?: number, limit?: number) => Promise<void>;
}

export default function StoriesGenerator({ sortedStories,fetchStoriesByLimit }: Props) {
    if (!sortedStories) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <>
            <div className={s.stories}>
                {sortedStories.map(story => <Story image={story.image!} key={story.id} id={story.id!} title={story.title!} author={story.authorName!} />)}
            </div>
            <PaginationButtons fetchStoriesByLimit={fetchStoriesByLimit}/>
        </>
    );

};