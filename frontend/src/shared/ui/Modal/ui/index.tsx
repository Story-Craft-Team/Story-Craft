import React, { ReactNode, useState } from "react";
import s from "./modalWindow.module.scss";
import { useSettingsStore } from "@/shared/stores";

interface Props {
	children: ReactNode;
}

export default function Modal({ children }: Props) {
	const [windowIsVisible, setWindowVisible] = useState<boolean>(true);
	const theme = useSettingsStore(state => state.theme)

	return (
		<div
			className={windowIsVisible ? s.modalOverlay : s.containerUnVisible}
			onClick={() =>
				windowIsVisible ? setWindowVisible(false) : setWindowVisible(true)
			}
		>
			<div
				className={windowIsVisible ? theme === "dark"? s.containerVisibleDark : s.containerVisibleLight : s.containerUnVisible}
			>
				{children}
			</div>
		</div>
	);
}
