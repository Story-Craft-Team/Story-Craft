import React from 'react';
import s from './StoriesSort.module.scss'
import { CustomSelect } from '@/shared/ui';

export default function StoriesSort(){
    return (
        <div className={s.storiesSort}>
			<h1>Истории</h1>
			<CustomSelect
				onChange={() => console.log() } 
				options={[{content: "Сортировать по лайкам", value: "likes", disabled: false}, {content: "Сортировать по просмотрам", value: "watches", disabled: false}]} 
				defaultValue={{content: "Сортировать по лайкам", value: "likes", disabled: false}}
			/>
		</div>
    );
};