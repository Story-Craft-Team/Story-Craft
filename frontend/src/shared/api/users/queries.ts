import { IUser } from "@/shared/lib";
import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";
import { toast } from "react-toastify";
import axios from "axios";

export const findUser = async (idOrUsername: string): Promise<IUser | undefined> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.users.findUser + idOrUsername);
    return response.data.user;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      toast.error("Пользователь не найден");
      return;
    }
    toast.error("Ошибка при получении пользователя");
    throw error;
  }
};