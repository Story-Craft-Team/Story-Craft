import { Module } from '@nestjs/common';
import { HelpersService } from './services/helpers.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserHelperService } from './services/user-helpers.service';
import { UserAuthHelperService } from './services/user-auth.helpers.service';

@Module({
  imports: [PrismaModule],
  providers: [HelpersService, UserHelperService],
  exports: [HelpersService, UserHelperService],
})
export class HelpersModule {}
