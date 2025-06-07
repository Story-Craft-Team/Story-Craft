"use client";

import { ChangeEvent, useState } from "react";
import s from "./Login.module.scss";
import { Submit } from "@/shared/ui";
import { CustomInput } from "@/shared/ui";
import { CustomForm } from "@/shared/ui";
import { useLogin } from "@/shared/lib";
import { setFormDataValue } from "@/shared/lib";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IRegistrationSubmitData } from "@/shared/lib";

export default function Login() {
  const [formData, setFormData] = useState<IRegistrationSubmitData>({
    username: "",
    password: "",
    rePassword: "",
    email: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { submitLogin } = useLogin();

  const changePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        <div className={s.passwordBlock}>
          <CustomInput
            type={showPassword ? "text" : "password"}
            placeholder="Ваш пароль"
            className={s.input}
            value={formData.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormDataValue(
                setFormData,
                formData,
                "password",
                e.target.value
              )
            }
          />
          {showPassword ? (
            <FaEyeSlash
              className={s.eyeIcon}
              onClick={changePasswordVisibility}
            />
          ) : (
            <FaEye className={s.eyeIcon} onClick={changePasswordVisibility} />
          )}
        </div>
        <Link className={s.link} href="/auth/register">
          Зарегистрироваться
        </Link>
        <Submit>Войти</Submit>
      </CustomForm>
    </div>
  );
}
