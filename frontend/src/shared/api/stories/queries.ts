import { IStoryHeader, IView, ILike, PaginatedResult } from "@/shared/lib";
import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";
import { getAllScenes } from "../scenes/queries";

export const getAllStories = async (): Promise<IStoryHeader[]> => {
  try {
    const response = await axiosInstance.get(`${API_ROUTES.stories.AllStories}`);
    return response.data.stories;
  } catch (error) {
    throw error;
  }
};

export const getStoriesByLimit = async (page: number, limit: number): Promise<IStoryHeader[]> => {
  try {
    const response = await axiosInstance.get(`${API_ROUTES.stories.AllStories}/paginated`,
      { params: { page, limit } }
    );
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

export const getStoryLikesCount = async (storyId: number): Promise<number> => {
  try{
    const storyLikes = await axiosInstance.get(`/stories/likes/${storyId}`)
    return storyLikes.data.likes.length
  }catch(error){
    throw error
  }
}

export const getStoryLikes = async (storyId: number): Promise<ILike[]> => {
  try{
    const storyLikes = await axiosInstance.get(`/stories/likes/${storyId}`)
    return storyLikes.data.likes
  }catch(error){
    throw error
  }
}

export const setStoryLike = async (storyId: number): Promise<ILike> => {
  try{
    const storyLikes = await axiosInstance.patch(`/stories/likes/like/${storyId}`)
    return storyLikes.data
  }catch(error){
    throw error
  }
}

export const deleteStoryLike = async (storyId: number): Promise<ILike> => {
  try{
    const storyLikes = await axiosInstance.patch(`/stories/likes/unlike/${storyId}`)
    return storyLikes.data
  }catch(error){
    throw error
  }
}

export const getStoryViews = async (storyId: number): Promise<number> => {
  try{
    const storyViews = await axiosInstance.get(`/stories/views/${storyId}`)
    return storyViews.data.views.length
  }catch(error){
    throw error
  }
}

export const setStoryView = async (storyId: number): Promise<IView> => {
  try{
    const storyView = await axiosInstance.patch(`/stories/views/view/${storyId}`)
    return storyView.data
  }catch(error){
    throw error
  }
}