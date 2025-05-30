"use client";

import { Modal } from "@/shared/ui";
import React, { useEffect, useState } from "react";
import s from "./MainModal.module.scss";
import { useSettingsStore } from "@/shared/stores";
import { useShallow } from "zustand/shallow";

export default function HomeModal() {
	const [hasUserData, setHasUserData] = useState<boolean>(false);
	const [username, setUsername] = useState<string>("");
	
	const {theme} = useSettingsStore(useShallow((state) => state))
	useEffect(() => {
		//getting authorized user data
		setHasUserData(!!localStorage.getItem("userData"));
		const data = localStorage.getItem("userData");
		if (data) {
			setUsername(JSON.parse(data).username);
		}
	}, []);

	return (
		<>
			{hasUserData && (
				<Modal>
					<h1 className={theme === "dark" ? s.alertDark : s.alertLight}>Приветствую, {username}</h1>
				</Modal>
			)}
		</>
	);
}
