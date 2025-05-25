import React, { ReactNode, useState } from "react";
import s from "./modalWindow.module.scss";

interface Props {
	children: ReactNode;
}

export default function Modal({ children }: Props) {
	const [windowIsVisible, setWindowVisible] = useState<boolean>(true);

	return (
		<div
			className={windowIsVisible ? s.modalOverlay : s.containerUnVisible}
			onClick={() =>
				windowIsVisible ? setWindowVisible(false) : setWindowVisible(true)
			}
		>
			<div
				className={windowIsVisible ? s.containerVisible : s.containerUnVisible}
			>
				{children}
			</div>
		</div>
	);
}
