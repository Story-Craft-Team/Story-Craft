'use client'

import React from 'react';
import s from './Settings.module.scss'
import { useStore } from '@/shared/stores';
import { useSettingsChange } from '@/shared/helpers';
import { CustomSelect } from '@/shared/ui';

export default function Settings(){
    const { language, theme } = useStore(state => state.settings)
    const { LanguageChange, ThemeChange } = useSettingsChange()

    return (
        <div className={s.container}>
            <h3>Язык интерфейса</h3>
            <CustomSelect 
                onChange={(value: string) => LanguageChange(value)} 
                options={[{content: "Русский", value: "ru", disabled: false}, {content: "English (в разработке)", value: "en", disabled: true}]} 
                defaultValue={language === "ru"? {content: "Русский", value: "ru", disabled: false}: {content: "English", value: "en", disabled: true}}
            />
            <hr/>
            <h3>Тема интерфейса</h3>
            <CustomSelect 
                onChange={(value: string) => ThemeChange(value)} 
                options={[{content: "Темная", value: "dark", disabled: false}, {content: "Светлая (в разработке)", value: "light", disabled: true}]}
                defaultValue={theme === "dark"? {content: "Темная", value: "dark", disabled: false}:  {content: "Светлая", value: "light", disabled: true}}
            />
        </div>
    );
};