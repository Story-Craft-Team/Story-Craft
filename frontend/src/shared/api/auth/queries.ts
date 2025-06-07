import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";
import { AuthResponse } from "./types";
import { toast } from "react-toastify";

export const me = async (accessToken: string): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.auth.me, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to get user");
    throw error;
  }
};

export const updateUserJwt = async (refreshToken: string): Promise<Object> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.auth.updateUserJwt, {
      refreshToken,
    });
    return response.data.accessToken;
  } catch (error) {
    console.error(error);
    toast.error("Failed to update JWT");
    throw error;
  }
};