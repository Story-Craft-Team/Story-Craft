import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/deffault/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '@prisma/client';
import { BcryptService } from 'src/modules/deffault/bcrypt/services/bcrypt.service';
import { AuthService } from 'src/modules/deffault/auth/services/auth.service';
import {
  UserHelperService,
} from 'src/modules/deffault/helpers/services/user-helpers.service';
import { USER_INCLUDE } from 'src/common/constants';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoginResponse } from '../responses/user-auth.response';
import { UserWithoutPassword } from 'src/common/types/UserWithoutPassword';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly authService: AuthService,
    private readonly userHelpers: UserHelperService,
  ) {}

  /**
   * Register a new user
   * @param dto - The user data
   * @returns The registered user
   */
  async register(
    dto: CreateUserDto,
  ): Promise<{ accessToken: string; user: Omit<User, 'password'> }> {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [{ email: dto.email }, { username: dto.username }],
        },
      });

      if (existingUser) {
        throw new ConflictException('Username or email already exists');
      }

      if (!dto.password) {
        throw new BadRequestException('Password is required');
      }

      const hashedPassword = await this.bcryptService.hashPassword(
        dto.password,
      );

      const settings = dto.settings ?? {
        theme: 'dark',
        language: 'ru',
      };

      const createdUser = await this.prisma.user.create({
        data: {
          ...dto,
          password: hashedPassword,
          settings: { create: settings },
        },
        include: USER_INCLUDE,
      });

      return {
        accessToken: await this.authService.generateToken(createdUser),
        user: this.userHelpers.excludePassword(
          createdUser,
        ) as UserWithoutPassword,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login a user
   * @param loginUserDto - The login user data
   * @returns The access token and user
   */
  async login(
    loginUserDto: LoginUserDto,
  ): Promise<LoginResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: loginUserDto.email, username: loginUserDto.username },
      });
      if (!user) {
        throw new NotFoundException('User with this email not found');
      }

      const passwordValid = await this.bcryptService.comparePasswords(
        loginUserDto.password,
        user.password,
      );
      if (!passwordValid) {
        throw new BadRequestException('Invalid password');
      }

      const accessToken = await this.authService.generateToken(user);

      return {
        accessToken,
        user: this.userHelpers.excludePassword(user) as UserWithoutPassword,
      };
    } catch (error) {
      throw error;
    }
  }
}
