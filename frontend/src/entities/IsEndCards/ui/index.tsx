import React, { useEffect } from 'react';
import s from './IsEndCards.module.scss'
import { useRouter } from 'next/navigation';
import { useHeader } from '@/shared/lib';

interface Card {
    text: string;
    path: string;
}

export default function IsEndCards() {
    const router = useRouter();
    const {getStory, story} = useHeader()

    useEffect(() => {
        getStory()
    }, [])

    const EndCards: Card[] = [
        { text: "To home", path: "/" },
        { text: "To story", path: `/read/${story?.id}` },
        { text: "To first scene", path: `/read/${story?.id}/${story?.scenes[0].id}` }
    ];

    return (
        <div className={s.choiceContainer}>
            {EndCards.map((card: Card, index) => (
                <div
                    key={index}
                    onClick={() => router.push(card.path)}
                    className={`${s.choice} ${s.hasAccess}`}
                >
                    {card.text}
                </div>
            ))}
        </div>
    );
};
