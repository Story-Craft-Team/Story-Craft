import { UpdateUserDto } from "./types";
import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";

export const updateMe = async (id: string | number, data: UpdateUserDto) => {
  try {
    const idString = id.toString();
    const response = await axiosInstance.patch(
      API_ROUTES.users.updateMe + '/' + idString,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
