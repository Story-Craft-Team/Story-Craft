"use client";

import { useRegistration } from "@/shared/lib";
import { CustomForm, CustomInput, Submit } from "@/shared/ui";
import { ChangeEvent, useState } from "react";
import s from "./Registration.module.scss";
import { IRegistrationSubmitData } from "@/shared/lib";
import { setFormDataValue } from "@/shared/lib";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Registration() {
  const [formData, setFormData] = useState<IRegistrationSubmitData>({
    username: "",
    password: "",
    rePassword: "",
    email: "",
  });
  const { submitRegistration } = useRegistration();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const changePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s.container}>
      <CustomForm onSubmit={() => submitRegistration(formData)}>
        <h1>Регистрация</h1>
        <CustomInput
          className={s.input}
          value={formData.username}
          placeholder="Имя пользователя..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormDataValue(setFormData, formData, "username", e.target.value)
          }
        />
        <CustomInput
          className={s.input}
          type="email"
          value={formData.email}
          placeholder="Email..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormDataValue(setFormData, formData, "email", e.target.value)
          }
        />

        <div className={s.passwordBlock}>
          <CustomInput
            className={s.input}
            type={showPassword ? "text" : "password"}
            value={formData.password}
            placeholder="Пароль..."
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

        <div className={s.passwordBlock}>
        <CustomInput
          className={s.input}
          type={showPassword ? "text" : "password"}
          value={formData.rePassword}
          placeholder="Повторите пароль..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormDataValue(
              setFormData,
              formData,
              "rePassword",
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
        <Link className={s.link} href="/auth/login">
          Уже есть аккаунт?
        </Link>
        <Submit>Зарегистрироваться</Submit>
      </CustomForm>
    </div>
  );
}
