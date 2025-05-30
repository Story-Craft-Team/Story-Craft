'use client'

import React from 'react';
import s from './Settings.module.scss'
import { useSettingsStore } from '@/shared/stores';
import { useSettingsChange } from '@/shared/lib/hooks';
import { CustomSelect } from '@/shared/ui';
import { useShallow } from 'zustand/shallow';
import { ISettings } from '@/shared/lib/types';

export default function Settings(){
    const { language, theme } = useSettingsStore(useShallow((state) => state))
    const { LanguageChange, ThemeChange } = useSettingsChange()

    return (
        <div className={s.container}>
            <h3>Язык интерфейса</h3>
            <CustomSelect 
                onChange={(value: string) => LanguageChange(value as ISettings["language"]) } 
                options={[{content: "Русский", value: "ru", disabled: false}, {content: "English (в разработке)", value: "en", disabled: true}]} 
                defaultValue={language === "ru"? {content: "Русский", value: "ru", disabled: false}: {content: "English", value: "en", disabled: true}}
            />
            <hr/>
            <h3>Тема интерфейса</h3>
            <CustomSelect 
                onChange={(value: string) => ThemeChange(value as ISettings["theme"]) } 
                options={[{content: "Темная", value: "dark", disabled: false}, {content: "Светлая (в разработке)", value: "light", disabled: true}]}
                defaultValue={theme === "dark"? {content: "Темная", value: "dark", disabled: false}:  {content: "Светлая", value: "light", disabled: true}}
            />
        </div>
    );
};