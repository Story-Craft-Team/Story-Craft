import { type IUser } from "@/shared/lib/types";

type UserActions = {
	setUsername: (username: IUser["username"]) => void;
	setEmail: (email: IUser["email"]) => void;
	setRole: (role: IUser["role"]) => void;
	setIsVerified: (isVerified: IUser["isVerified"]) => void;
	setDisplayName: (displayName: IUser["displayName"]) => void;
	setBio: (bio: IUser["bio"]) => void;
	setAvatarUrl: (avatarUrl: IUser["avatarUrl"]) => void;
	setFavoriteStories: (favoriteStories: IUser["favoriteStories"]) => void;
	setFollowedUsers: (followedUsers: IUser["followedUsers"]) => void;
	setFollowingUsers: (followingUsers: IUser["followingUsers"]) => void;
	setSettings: (settings: IUser["settings"]) => void;
	setTheme: (theme: IUser["settings"]["theme"]) => void;
	setLanguage: (language: IUser["settings"]["language"]) => void;
};

export interface UserSlice extends IUser, UserActions {}
