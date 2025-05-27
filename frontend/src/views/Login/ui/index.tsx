"use client";

import { ChangeEvent, useEffect, useState } from "react";
import s from "./Login.module.scss";
import { Submit } from "@/shared/ui";
import { CustomInput } from "@/shared/ui";
import { CustomForm } from "@/shared/ui";
import { useLogin } from "@/shared/helpers/auth";

export default function Login() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [newUserData, setNewUserData] = useState<string>("");

	const { submitLogin } = useLogin();
	useEffect(() => {
		//getting a new user from the registration form (newUserData)
		const data = localStorage.getItem("regUserData");
		if (data) setNewUserData(JSON.parse(data));
	}, []);

	return (
		<div className={s.container}>
			<CustomForm onSubmit={() => submitLogin(newUserData, password, username)}>
				<h1>Авторизация</h1>
				<CustomInput
					placeholder="Ваш логин"
					value={username}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setUsername(e.target.value)
					}
				/>
				<CustomInput
					type="password"
					placeholder="Ваш пароль"
					value={password}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setPassword(e.target.value)
					}
				/>
				<h5 className={s.alert}>НЕ СТАВЬТЕ СВОЙ НАСТОЯЩИЙ ПАРОЛЬ!</h5>
				<Submit>Войти</Submit>
			</CustomForm>
		</div>
	);
}
