import { IStoryEditor, IUser } from "@/shared/lib";
import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";

export const stories = async (): Promise<IStoryEditor | undefined> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.stories.AllStories);
    return response.data.stories;
  } catch (error: any) {
    throw error;
  }
};