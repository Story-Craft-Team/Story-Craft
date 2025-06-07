import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";
import {
  AuthResponse,
  UpdateUserJwtResponse,
} from "./types";

export const me = async (accessToken: string): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.auth.me);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserJwt = async (
  refreshToken: string
): Promise<UpdateUserJwtResponse> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.auth.updateUserJwt, {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
