import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/modules/default/prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { HelpersService } from 'src/modules/helpers/services/helpers.service';
import { BcryptService } from 'src/modules/bcrypt/services/bcrypt.service';
import { UserHelperService } from 'src/modules/helpers/services/user-helpers.service';
import { USER_INCLUDE } from 'src/common/constants';
import {
  DeleteResponse,
  UpdateResponse,
  FindOneResponse,
  FindAllResponse,
} from '../responses/user-crud.response';
import { UserWithoutPassword } from 'src/modules/helpers/services/user-helpers.service';

@Injectable()
export class UserCrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
    private readonly bcryptService: BcryptService,
    private readonly userHelper: UserHelperService,
  ) {}

  /**
   * Find all users
   * @returns An array of users
   */
  async findAll(): Promise<FindAllResponse> {
    try {
      const users = await this.prisma.user.findMany({
        include: USER_INCLUDE,
      });
      return { users: users.map((u) => this.userHelper.excludePassword(u)) as UserWithoutPassword[] };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find a user by ID
   * @param id - The ID of the user to find
   * @returns The user
   */
  async findOne(id: number): Promise<FindOneResponse> {
    try {
      const user = await this.helpers.getEntityOrThrow<User>('user', { id }, 'User');
      return { user: this.userHelper.excludePassword(user) as UserWithoutPassword };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a user by ID
   * @param id - The ID of the user to update
   * @param dto - The update data
   * @returns The updated user
   */
  async update(id: number, dto: UpdateUserDto): Promise<UpdateResponse> {
    try {
      await this.helpers.getEntityOrThrow<User>('user', { id }, 'User');

      const { settings, password, ...rest } = dto;

      const data: Prisma.UserUncheckedUpdateInput = {
      ...rest,
      settings: settings && {
        upsert: {
          update: settings,
          create: settings,
        },
      },
      updatedAt: new Date(),
    };

    if (password) {
      data.password = await this.bcryptService.hashPassword(password);
    }

    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined),
    );

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: cleanData,
      include: USER_INCLUDE,
    });

    return { user: this.userHelper.excludePassword(updatedUser) as UserWithoutPassword};
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove a user by ID
   * @param id - The ID of the user to remove
   * @returns {status: number, message: string}
   */
  async remove(id: number): Promise<DeleteResponse> {
    try {
      await this.helpers.getEntityOrThrow<User>('user', { id }, 'User');
      await this.prisma.user.delete({ where: { id } });
      return { status: 200, message: 'User removed successfully' };
    } catch (error) {
      throw error;
    }
  }
}
