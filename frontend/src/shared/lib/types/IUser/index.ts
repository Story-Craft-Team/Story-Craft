import { UserRoles, ISettings, UserPlan } from "@/shared/lib";

export interface IUser {
  id: number;
  username: string;
  email: string;
  role: UserRoles;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  plan: UserPlan;
	planWillDeleteAt?: Date;
  planCreatedAt?: Date;
}

export interface ILoginSubmitData {
  username?: string;
  password: string;
}

export interface IRegistrationSubmitData {
  email: string;
  username: string;
  password: string;
  rePassword: string;
}