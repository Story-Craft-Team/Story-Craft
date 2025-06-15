import { StateCreator } from 'zustand';

export interface StoryProgress {
  storyId: number;
  userId: number;
  currentSceneId: number;
}

export interface ReadingStoriesSlice {
  stories: StoryProgress[];
  startAndUpdateStory: (storyId: number, userId: number, currentSceneId?: number) => void;
  getStoryProgress: (storyId: number, userId: number) => StoryProgress | undefined;
}

export const createReadingStoriesSlice: StateCreator<
  ReadingStoriesSlice
> = (set, get) => ({
  stories: [],
  
  startAndUpdateStory: (storyId, userId, currentSceneId = 1) => {
    set((state) => {
      const existingIndex = state.stories.findIndex(
        s => s.storyId === storyId && s.userId === userId
      );
      
      if (existingIndex >= 0) {
        const updatedStories = [...state.stories];
        updatedStories[existingIndex] = {
          ...updatedStories[existingIndex],
          currentSceneId
        };
        return { stories: updatedStories };
      }
      
      return {
        stories: [...state.stories, { storyId, userId, currentSceneId }]
      };
    });
  },
  
  getStoryProgress: (storyId, userId) => {
    return get().stories.find(s => s.storyId === storyId && s.userId === userId);
  }
});
