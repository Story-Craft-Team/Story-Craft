import { useRouter } from "next/navigation";
import {
  IRegistrationSubmitData,
  type ILoginSubmitData,
} from "@/shared/lib";
import { LoginDto, RegisterDto } from "@/shared/api/auth/types";
import { register, login } from "@/shared/api/auth/mutations";

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

  const submitLogin = async (data: ILoginSubmitData) => {
    let { username, password } = data;
    const email = username?.includes("@") ? username : undefined;
    if (email) username = undefined;
    try {
      const response = await login({ username, email, password } as LoginDto);
      saveTokens(response?.tokens);
      router.push("/");
    } catch (error) {
      alert("Login failed");
    }
  };

  const submitRegistration = async (data: IRegistrationSubmitData) => {
    const { username, password, rePassword, email } = data;

    if (password !== rePassword) return alert("Passwords do not match");
    if (password.length < 6)
      return alert("Password must be at least 6 characters long");
    if (username.includes(" "))
      return alert("Username must not contain spaces");

    try {
      const response = await register({
        username,
        email,
        password,
      } as RegisterDto);
      saveTokens(response?.tokens);
      router.push("/");
    } catch (error) {
      alert("Registration failed");
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
