import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants/jwt.config';
import { JwtPayload } from 'src/common/types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: JwtPayload): Promise<string> {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  
    return this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.accessTokenExpiresIn,
    });
  }
  
  async generateRefreshToken(user: JwtPayload): Promise<string> {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  
    return this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.refreshTokenExpiresIn,
    });
  }
  
  async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
