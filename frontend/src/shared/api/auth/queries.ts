import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";
import { AuthResponse } from "./types";

export const me = async (accessToken: string): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.auth.me, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserJwt = async (refreshToken: string): Promise<Object> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.auth.updateUserJwt, {
      refreshToken,
    });
    console.log(response.data);
    return response.data.accessToken;
  } catch (error) {
    throw error;
  }
};