import { Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Body } from '@nestjs/common';
import { UserAuthService } from '../services/user-auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { RegisterResponse, LoginResponse } from '../responses/user-auth.response';

@ApiTags('User - auth')
@Controller('users/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: RegisterResponse,
  })
  @ApiResponse({
    status: 409,
    description: 'This user already exists',
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
    example: {
      
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.userAuthService.login(loginUserDto);
  }
}
