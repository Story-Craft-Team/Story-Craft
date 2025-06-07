import { axiosInstance } from "../client";
import { RegisterDto, AuthResponse, LoginDto } from "./types";
import { API_ROUTES } from "../endpoints";

export const register = async (data: RegisterDto): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.auth.register, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (data: LoginDto): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.auth.login, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
