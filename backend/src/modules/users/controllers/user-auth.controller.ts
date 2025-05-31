import { Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Body } from '@nestjs/common';
import { UserAuthService } from '../services/user-auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { RegisterResponse, LoginResponse, RegisterResponse404, LoginResponse404, LoginResponse400 } from '../responses/user-auth.response';

@ApiTags('User - auth')
@Controller('users/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
    type: RegisterResponse,
  })
  @ApiResponse({
    status: 409,
    description: 'This user already exists',
    type: RegisterResponse404,
  })
  register(@Body() createUserDto: CreateUserDto): Promise<RegisterResponse> {
    return this.userAuthService.register(createUserDto);
  }

  // Login
  @Post('/login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
    type: LoginResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'User with this email not found',
    type: LoginResponse404,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials',
    type: LoginResponse400,
  })
  login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.userAuthService.login(loginUserDto);
  }
}
