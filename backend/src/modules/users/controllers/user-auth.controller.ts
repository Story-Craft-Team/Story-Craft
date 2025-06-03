import { Get, Post, Req, Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Body } from '@nestjs/common';
import { UserAuthService } from '../services/user-auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { RegisterResponse, LoginResponse, LogoutResponse, MeResponse } from '../responses/user-auth.response';
import { GoogleAuthGuard } from 'src/common/guards/google-auth.guard';
import { JwtAuthGuard } from 'src/modules/deffault/auth/guards/jwt-auth.guard';
import { UserAuthHelperService } from 'src/modules/deffault/helpers/services/user-auth.helpers.service';

@ApiTags('User - auth')
@Controller('users/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService,
              private readonly userAuthHelperService: UserAuthHelperService
  ) {}

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
    res.redirect(`http://localhost:3000?token=${response.tokens.accessToken}`)
  }

  @ApiOperation({ summary: 'Information about user with JWT' })
  @ApiResponse({
    status: 200,
    description: 'Information about user and JWT received successfully.',
    type: MeResponse
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@Request() req){
    const token = req.headers.authorization.split(' ')[1];
    return this.userAuthService.me(token);
  }

  @ApiOperation({ summary: 'JWT revoking' })
  @ApiResponse({
    status: 200,
    description: 'User JWT revoked.',
    type: LogoutResponse
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(@Request() req){
    const token = req.headers.authorization.split(' ')[1];
    return this.userAuthHelperService.revokeToken(token);
  }
}
