import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/deffault/prisma/prisma.service';
import { HelpersService } from 'src/modules/deffault/helpers/services/helpers.service';
import { User } from '@prisma/client';
import { UserFollowResponse } from '../responses/user-follows.response';
import { UserWithoutPassword } from 'src/common/types/UserWithoutPassword';

@Injectable()
export class UserFollowsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helperService: HelpersService,
  ) {}

  /**
   * Find all followers of a user
   * @param userId - The ID of the user to find followers for
   * @returns The followers of the user
   */
  async findAllFollowers(userId: number) {
    try {
      await this.helperService.getEntityOrThrow<User>('user', { id: userId }, 'User');
      const follows = await this.prisma.follow.findMany({
        where: {
          followingId: userId,
        },
        include: {
          followedUser: true,
        },
      });

      const users = follows.map((follow) => follow.followedUser);

      const followsWithoutPassword = follows.map((follow) => {
        const { ...rest } = follow;
        return {
          ...rest,
          followedUser: users,
        };
      });

      return { follows: followsWithoutPassword };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Follow a user
   * @param userId - The ID of the user
   * @param followerId - The ID of the follower
   * @returns The follow object
   */
  async follow(userId: number, followerId: number): Promise<UserFollowResponse> {
    try {

      if (!userId) {
        throw new BadRequestException('User not authenticated');
      }

      await this.helperService.getEntityOrThrow<User>('user', { id: userId }, 'User');
      await this.helperService.getEntityOrThrow<User>('user', { id: followerId }, 'User');

      if (userId === followerId) {
        throw new BadRequestException('You cannot follow yourself');
      }

      const follow = await this.prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId,
            followingId: userId,
          },
        },
      });

      if (follow) {
        throw new BadRequestException('You are already following this user');
      }

      await this.prisma.follow.create({
        data: {
          followerId,
          followingId: userId,
        },
      });

      const follows = await this.prisma.follow.findMany({
        where: {
          followingId: userId,
        },
        include: {
          followedUser: true,
        },
      });

      const users = follows.map((follow) => follow.followedUser);

      const followsWithoutPassword = follows.map((follow) => {
        const { ...rest } = follow;
        return {
          ...rest,
          followedUser: users,
        };
      });

      return { follows: followsWithoutPassword };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Unfollow a user
   * @param userId - The ID of the user
   * @param followerId - The ID of the follower
   * @returns The follow object
   */
  async unfollow(userId: number, followerId: number) {
    try {

      await this.helperService.getEntityOrThrow<User>('user', { id: userId }, 'User');
      await this.helperService.getEntityOrThrow<User>('user', { id: followerId }, 'User');
      const follow = await this.prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId,
            followingId: userId,
          },
        },
      });

      if (!follow) {
        throw new BadRequestException('You are not following this user');
      }

      await this.prisma.follow.deleteMany({
        where: {
          followerId,
          followingId: userId,
        },
      });

      const follows = await this.prisma.follow.findMany({
        where: {
          followingId: userId,
        },
        include: {
          followedUser: true,
        },
      });

      const users = follows.map((follow) => follow.followedUser);

      const followsWithoutPassword = follows.map((follow) => {
        const { ...rest } = follow;
        return {
          ...rest,
          followedUser: users,
        };
      });

      return { follows: followsWithoutPassword };
    } catch (error) {
      throw error;
    }
  }
}
