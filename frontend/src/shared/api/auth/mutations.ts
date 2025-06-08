import { axiosInstance } from "../client";
import { RegisterDto, AuthResponse, LoginDto } from "./types";
import { API_ROUTES } from "../endpoints";
import axios from "axios";
import { toast } from "react-toastify";

export const register = async (data: RegisterDto): Promise<AuthResponse | undefined> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.auth.register, data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      toast.error("ошибка при регистрации: " + error.response?.data.message);
      return;
    }
    throw error;
  }
};

export const login = async (data: LoginDto): Promise<AuthResponse | undefined> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.auth.login, data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      toast.error(`Ошибка при входе: ${error.response?.data.message}`);
      return;
    }
    throw error;
  }
};
