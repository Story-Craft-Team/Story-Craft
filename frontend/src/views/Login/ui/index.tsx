"use client";

import { ChangeEvent, useEffect, useState } from "react";
import s from "./Login.module.scss";
import { Submit } from "@/shared/ui";
import { CustomInput } from "@/shared/ui";
import { CustomForm } from "@/shared/ui";
import { useLogin } from "@/shared/lib/hooks";
import { setFormDataValue } from "@/shared/lib/helpers";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { submitLogin } = useLogin();

  return (
    <div className={s.container}>
      <CustomForm onSubmit={() => submitLogin(formData)}>
        <h1>Авторизация</h1>
        <CustomInput
          placeholder="Ваш логин"
          className={s.input}
          value={formData.username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormDataValue(setFormData, formData, "username", e.target.value)
          }
        />
        <CustomInput
          type="password"
          placeholder="Ваш пароль"
          className={s.input}
          value={formData.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormDataValue(setFormData, formData, "password", e.target.value)
          }
        />
        <Link className={s.link} href="/auth/register">
          Зарегистрироваться
        </Link>
        <Submit>Войти</Submit>
      </CustomForm>
    </div>
  );
}
