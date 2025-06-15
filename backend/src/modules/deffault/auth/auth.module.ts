import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserAuthHelperService } from '../helpers/services/user-auth.helpers.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UserAuthHelperService],
  exports: [AuthService, PassportModule, JwtModule,],
})
export class AuthModule {}
