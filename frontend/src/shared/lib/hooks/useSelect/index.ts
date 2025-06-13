'use client'

import { useState} from 'react';
import { SelectOption } from '@/shared/lib';

export const useSelect = (
  defaultValue: SelectOption,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption>(defaultValue);

  return {
    isOpen,
    setIsOpen,
    selected,
    setSelected
  };
};