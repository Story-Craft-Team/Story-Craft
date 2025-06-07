import React, { ReactNode } from "react";
import s from "./newModalWindow.module.scss";
import { useSettingsStore } from "@/shared/stores";

interface Props {
  children: ReactNode;
  setIsVisible: (value: boolean) => void;
  isVisible: boolean;
}

export default function NewModal({ setIsVisible, isVisible, children }: Props) {
  const theme = useSettingsStore((state) => state.theme);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Проверяем, что клик был именно на оверлей, а не на его детей
    if (e.target === e.currentTarget) {
      setIsVisible(false);
    }
  };

  return (
    <>
      {isVisible && (
        <div
          className={s.modalOverlay}
          onClick={handleOverlayClick}
        >
          <div
            className={
              theme === "dark"
                ? s.containerVisibleDark
                : s.containerVisibleLight
            }
            onClick={(e) => e.stopPropagation()} // Предотвращаем всплытие клика
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}