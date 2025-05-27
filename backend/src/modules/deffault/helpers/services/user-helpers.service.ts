import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'password'>; // вынести

@Injectable()
export class UserHelperService {
  excludePassword(
    user: User | User[],
  ): UserWithoutPassword | UserWithoutPassword[] {
    if (Array.isArray(user)) {
      return user.map(({ password, ...rest }) => rest);
    }
    const { password, ...rest } = user;
    return rest;
  }
}
