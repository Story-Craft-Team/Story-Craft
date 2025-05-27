"use client";

import { Modal } from "@/shared/ui";
import React, { useEffect, useState } from "react";
import s from "./MainModal.module.scss";

export default function HomeModal() {
	const [hasUserData, setHasUserData] = useState<boolean>(false);
	const [username, setUsername] = useState<string>("");
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
					<h1 className={s.alert}>Приветствую, {username}</h1>
				</Modal>
			)}
		</>
	);
}
