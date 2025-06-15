"use client"

import { useRouter } from "next/navigation";
import {
  type IRegistrationSubmitData,
} from "@/shared/lib";
import { LoginDto, RegisterDto } from "@/shared/api/auth/types";
import { register, login } from "@/shared/api/auth/mutations";
import { useAuthStore } from "@/shared/stores/auth";
import { toast } from "react-toastify";

const saveTokens = (tokens?: {
  accessToken?: string;
  refreshToken?: string;
}) => {
  if (!tokens) return;
  tokens.accessToken && localStorage.setItem("accessToken", tokens.accessToken);
  tokens.refreshToken &&
    localStorage.setItem("refreshToken", tokens.refreshToken);
};

const useAuth = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const submitLogin = async (data: IRegistrationSubmitData) => {
    let { username, password } = data;
    const email = username?.includes("@") ? username : undefined;
    if (email) username = "";
    try {
      const response = await login({ username, email, password } as LoginDto);
      if (!response) throw new Error("Login failed");
      saveTokens(response?.tokens);
      setUser(response?.user);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const submitRegistration = async (data: IRegistrationSubmitData) => {
    const { username, password, rePassword, email } = data;

    if (password !== rePassword) return toast.error("Пароли не совпадают");
    if (password.length < 6)
      return toast.error("Пароль должен содержать не менее 6 символов");
    if (username.includes(" "))
      return toast.error("Логин не должен содержать пробелы");
    if (username.length < 3)
      return toast.error("Логин должен содержать не менее 3 символов");
    if (!email.includes("@"))
      return toast.error("Email должен содержать символ @");
    try {
      const response = await register({
        username,
        email,
        password,
      } as RegisterDto);
      if (!response?.user) throw new Error("Registration failed");
      saveTokens(response?.tokens);
      setUser(response?.user);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return { submitLogin, submitRegistration };
};

export const useLogin = () => {
  const { submitLogin } = useAuth();
  return { submitLogin };
};

export const useRegistration = () => {
  const { submitRegistration } = useAuth();
  return { submitRegistration };
};
