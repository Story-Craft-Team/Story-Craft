import React, { ReactNode } from "react";
import s from "./newModalWindow.module.scss";
import { handleOverlayClick, useModal } from "@/shared/lib";

interface Props {
  children: ReactNode;
  setIsVisible: (value: boolean) => void;
  isVisible: boolean;
}

export default function NewModal({ setIsVisible, isVisible, children }: Props) {
  const { theme } = useModal()

  return (
    <>
      {isVisible && (
        <div
          className={s.modalOverlay}
          onClick={(e) => handleOverlayClick(e, setIsVisible)}
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