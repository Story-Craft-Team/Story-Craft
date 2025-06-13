import { IStoryHeader } from "@/shared/lib";
import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";
import { error } from "console";
import { getAllScenes } from "../scenes/queries";

export const getAllStories = async (): Promise<IStoryHeader[]> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.stories.AllStories);
    return response.data.stories;
  } catch (error) {
    throw error;
  }
};

export const getOneStory = async (storyId: number): Promise<IStoryHeader> => {
  try{
    const story = await axiosInstance.get(`/stories/${storyId}`)
    const scenes = await getAllScenes(storyId)
    return {
      ...story.data.story,
      scenes
    }
  }catch(error){
    throw error
  }
}