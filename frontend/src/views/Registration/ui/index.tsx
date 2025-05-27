"use client";

import { useRegistration } from "@/shared/helpers";
import { CustomForm, CustomInput, Submit } from "@/shared/ui";
import { ChangeEvent, useState } from "react";
import s from "./Registration.module.scss";

export default function Registration() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const { RegistrationSubmit } = useRegistration();

  return (
    <div className={s.container}>
      <CustomForm
        onSubmit={() => RegistrationSubmit(rePassword, password, username)}
      >
        <h1>Регистрация</h1>
        <CustomInput
          value={username}
          placeholder="Придумайте логин"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <CustomInput
          type="password"
          value={password}
          placeholder="Придумайте пароль"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <CustomInput
          type="password"
          value={rePassword}
          placeholder="Повторите пароль"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRePassword(e.target.value)
          }
        />
        <h5 className={s.alert}>НЕ СТАВЬТЕ СВОЙ НАСТОЯЩИЙ ПАРОЛЬ!</h5>
        <Submit>Зарегистрироваться</Submit>
      </CustomForm>
    </div>
  );
}
