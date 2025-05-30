import { UserRoles, ISettings, UserPlan } from "@/shared/lib";

export interface IUser {
  id: number;
  username: string;
  email: string;

  role: UserRoles;
  plan: UserPlan;

  createdAt: Date;
  updatedAt: Date;
	
  isVerified: boolean;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;

  followedUsers?: number[];
  followingUsers?: number[];

  stories?: number[];
  likedStories?: number[];
  settings?: ISettings;
}

export interface ILoginSubmitData {
  email?: string;
  username?: string;
  password: string;
}
