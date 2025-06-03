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
import { RegisterResponse } from '../responses/user-auth.response';
import { HelpersService } from 'src/modules/deffault/helpers/services/helpers.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly authService: AuthService,
    private readonly userHelpers: UserHelperService,
    private readonly helpers: HelpersService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Register a new user
   * @param dto - The user data
   * @returns The registered user
   */
  async register(
    dto: CreateUserDto,
  ): Promise<RegisterResponse> {
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
      
      const refreshToken = await this.authService.generateRefreshToken(createdUser!);

      return {
        tokens: {
          accessToken: await this.authService.generateToken(createdUser),
          refreshToken,
        },
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

      const refreshToken = await this.authService.generateRefreshToken(user!);

      const accessToken = await this.authService.generateToken(user);

      return {
        tokens: {
          accessToken,
          refreshToken,
        },
        user: this.userHelpers.excludePassword(user) as UserWithoutPassword,
      };
    } catch (error) {
      throw error;
    }
  }

  async validateGoogleUser(googleUser: CreateUserDto){
    try{
      const user = await this.prisma.user.findUnique({
        where: {
          email: googleUser.email
        }
      })

      if(user)
        return user
      
      const hashedPassword = await this.bcryptService.hashPassword(
        googleUser.password,
      );
      
      const settings = googleUser.settings ?? {
        theme: 'dark',
        language: 'ru',
      };
  
      return await this.prisma.user.create({
        data:{
          ...googleUser,
          password: hashedPassword,
          settings: {create: settings}
        }
      })
    }
    catch(error){
      throw error
    }
  }

  async generateUserJwt(id: string){
    try {
      await this.helpers.getEntityOrThrow<User>('user', { id }, 'User');

      const user = await this.prisma.user.findUnique({
        where: { id: +id },
      });
      const accessToken = await this.authService.generateToken(user!);

      const refreshToken = await this.authService.generateRefreshToken(user!);
      
      return {
        tokens: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async me(accessToken: string){
    try{
      const data = await this.prisma.user.findUnique({
        where: {
          id: this.jwtService.decode(accessToken).id
        }
      })

      const refreshToken = await this.authService.generateRefreshToken(data!);

      const user = await this.userHelpers.excludePassword(data!)
      return{
        tokens: {
          accessToken,
          refreshToken,
        },
        ...user,
      }
    }
    catch(error){
      throw error
    }
  }
}
