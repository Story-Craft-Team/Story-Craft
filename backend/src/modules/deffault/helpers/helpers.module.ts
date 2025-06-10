import { Module } from '@nestjs/common';
import { HelpersService } from './services/helpers.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserAuthHelperService } from './services/user-auth.helpers.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/services/auth.service';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [HelpersService, AuthService, JwtService, UserAuthHelperService],
  exports: [HelpersService, UserAuthHelperService],
})
export class HelpersModule {}
