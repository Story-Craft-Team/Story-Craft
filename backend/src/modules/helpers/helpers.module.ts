import { Module } from '@nestjs/common';
import { HelpersService } from './services/helpers.service';
import { PrismaModule } from '../default/prisma/prisma.module';
import { UserHelperService } from './services/user-helpers.service';

@Module({
  imports: [PrismaModule],
  providers: [HelpersService, UserHelperService],
  exports: [HelpersService, UserHelperService],
})
export class HelpersModule {}
