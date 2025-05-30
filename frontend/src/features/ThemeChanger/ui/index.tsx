'use client'

import React, { ReactNode, useEffect, useState } from 'react';
import s from './ThemeChanger.module.scss'
import { useSettingsStore } from '@/shared/stores';

interface Props{
    children: ReactNode
}

export default function ThemeChanger({children} : Props){
    const {theme} = useSettingsStore(state => state);
    const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false);

    useEffect(() => {
        setIsThemeLoaded(true);
    }, [])

    if (!isThemeLoaded)
        return null;

    return (
        <div className={theme === 'dark'? s.darkTheme : s.lightTheme}>
            <div className={s.container}>
                {children}
            </div>
        </div>
    );
};