import { IChoice } from "@/shared/lib";
import { axiosInstance } from "../client";

export const getAllChoices = async (storyId: number, sceneId: number): Promise<IChoice[]> => {
  try {
    const response = await axiosInstance.get(`/stories/${storyId}/scenes/${sceneId}/choices`);
    return response.data;
  } catch (error) {
    throw error;
  }
};