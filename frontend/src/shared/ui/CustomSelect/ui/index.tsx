'use client'

import React, { useState } from 'react';
import s from './CustomSelect.module.scss'

type SelectOption = {
    content: string,
    value: string,
    disabled: boolean
}

interface Props{
    options: SelectOption[];
    defaultValue: SelectOption;
    onChange: (value: string) => void;
}

export default function CustomSelect({options, defaultValue, onChange}: Props){
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<SelectOption>(defaultValue);

    return (
        <div className={s.customSelectWrapper}>
            <div    
                className={isOpen? s.OpenedCustomSelect : s.ClosedCustomSelect} 
                data-value={selected.value} 
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected.content}
                <span className={isOpen? s.arrow : s.openArrow}>▼</span>
            </div>
        
            {isOpen && (
                <div className={s.customOptions}>
                {options.map(option => (
                    <div    
                        title={option.disabled? "В разработке": ""}
                        key={option.value} 
                        className={option.disabled ? s.disabledCustomOption : s.enabledCustomOption} 
                        onClick={() => {
                                if(!option.disabled){
                                    setSelected(option)
                                    setIsOpen(false)
                                    onChange(option.value)
                                }
                            } 
                        }
                    >
                    {option.content}
                    </div>
                ))}
                </div>
            )}
        </div>
    );
};