import React, { ReactNode } from "react";
import s from "./modalWindow.module.scss";
import { useModal } from "@/shared/lib";

interface Props {
  children: ReactNode;
}

export default function Modal({ children }: Props) {
  const { windowIsVisible, setWindowVisible, theme } = useModal()
  
  return (
    <div
      className={windowIsVisible ? s.modalOverlay : s.containerUnVisible}
      onClick={() =>
        windowIsVisible ? setWindowVisible(false) : setWindowVisible(true)
      }
    >
      <div
        className={
          windowIsVisible
            ? theme === "dark"
              ? s.containerVisibleDark
              : s.containerVisibleLight
            : s.containerUnVisible
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
