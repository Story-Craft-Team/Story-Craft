'use client'

import React from 'react';
import s from './StoriesSort.module.scss'
import { CustomSelect } from '@/shared/ui';
import { useStories } from '@/shared/lib/hooks/useStories';
import { IStoryHeader } from '@/shared/lib';

interface Props{
	sortedStories: IStoryHeader[] | null
	sortStories: (value: string) => Promise<void>
}

export default function StoriesSort({sortedStories, sortStories}: Props){
    return (
		<>
			<div className={s.storiesSort}>
				<h1>Истории</h1>
				<CustomSelect
					onChange={(value: string) => sortStories(value)} 
					options={[{content: "Сортировать по лайкам", value: "likes", disabled: false}, {content: "Сортировать по просмотрам", value: "views", disabled: false}]} 
					defaultValue={{content: "Сортировать по лайкам", value: "likes", disabled: false}}
				/>
			</div>
		</>
    );
};