import { IUser } from "@/shared/lib";

export type LoginDto = {
  email?: string;
  username?: string;
  password: string;
};

export type RegisterDto = {
  username: string;
  email: string;
  password: string;
  displayName?: string;
  avatarUrl?: string;
};

export type AuthResponse = {
  user: IUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};