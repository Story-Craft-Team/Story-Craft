import { BadRequestException, Injectable } from '@nestjs/common';
import { HelpersService } from 'src/modules/deffault/helpers/services/helpers.service';
import { PrismaService } from 'src/modules/deffault/prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { UserHelperService } from 'src/modules/deffault/helpers/services/user-helpers.service';

@Injectable()
export class UserOperationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helpers: HelpersService,
    private readonly userHelper: UserHelperService,
  ) {}

  /**
   * Verify a user
   * @param id - The ID of the user to verify
   * @returns The verified user
   */
  async verify(id: number) {
    try {
      const user = await this.helpers.getEntityOrThrow<User>('user', { id }, 'User');

      if (user.isVerified) {
        throw new BadRequestException('User is already verified');
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { isVerified: true },
      });

      return this.userHelper.excludePassword(updatedUser);
    } catch (error) {
      throw new BadRequestException('Error verifying user: ' + error.message);
    }
  }

  async setRole(id: number, body: { role: Role }) {
    try {
      await this.helpers.getEntityOrThrow<User>('user', { id }, 'User');

      const role = body.role

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { role },
      });

      return this.userHelper.excludePassword(updatedUser);
    } catch (error) {
      throw new BadRequestException('Error setting user role: ' + error.message);
    }
  }
}
