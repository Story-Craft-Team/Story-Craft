'use client'

import { useState} from 'react';
import { useSettingsStore } from '@/shared/stores';

export const useModal = () => {
    const [windowIsVisible, setWindowVisible] = useState<boolean>(true);
    const theme = useSettingsStore((state) => state.theme);
    
    return {windowIsVisible, setWindowVisible, theme}
};