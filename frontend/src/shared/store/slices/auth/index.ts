import { Store, UserSlice } from "@/common/lib/types";
import { StateCreator } from "zustand";

export const authSlice: StateCreator<
	Store,
	[["zustand/immer", never]],
	[],
	UserSlice
> = (set, get) => ({
	username: "",
	email: "",
	role: "reader",
	createdAt: new Date(),
	updatedAt: new Date(),
	isVerified: false,
	displayName: "",
	bio: "",
	avatarUrl: "",
	favoriteStories: [],
	followedUsers: [],
	followingUsers: [],
	settings: {
		theme: "dark",
		language: "ru",
	},

	setUsername: (username) => set({ username }),
	setEmail: (email) => set({ email }),
	setRole: (role) => set({ role }),
	setIsVerified: (isVerified) => set({ isVerified }),
	setDisplayName: (displayName) => set({ displayName }),
	setBio: (bio) => set({ bio }),
	setAvatarUrl: (avatarUrl) => set({ avatarUrl }),
	setFavoriteStories: (favoriteStories) => set({ favoriteStories }),
	setFollowedUsers: (followedUsers) => set({ followedUsers }),
	setFollowingUsers: (followingUsers) => set({ followingUsers }),
	setSettings: (settings) => set({ settings }),
	setTheme: (theme) => set({ settings: { ...get().settings, theme } }),
	setLanguage: (language) => set({ settings: { ...get().settings, language } }),
});
