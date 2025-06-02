import { Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Body } from '@nestjs/common';
import { UserAuthService } from '../services/user-auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { RegisterResponse, LoginResponse } from '../responses/user-auth.response';
import { GoogleAuthGuard } from 'src/common/guards/google-auth.guard';

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
    type: LoginResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.userAuthService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Login a user by google' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in with google.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UseGuards(GoogleAuthGuard)
  @Get("google/login")
  googleLogin(){}

  @ApiOperation({ summary: 'Generate JWT for google user and redirect to frontend' })
  @ApiResponse({
    status: 200,
    description: 'The JWT for google user has been successfully generated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UseGuards(GoogleAuthGuard)
  @Get("google/callback")
  async googleCallback(@Req() req, @Res() res){
    const response = await this.userAuthService.generateUserJwt(req.user.id)
    res.redirect(`http://localhost:3000?token=${response.accessToken}`)
  }
}
