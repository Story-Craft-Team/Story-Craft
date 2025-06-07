import { Module } from '@nestjs/common';
import { HelpersService } from './services/helpers.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserAuthHelperService } from './services/user-auth.helpers.service';

@Module({
  imports: [PrismaModule],
  providers: [HelpersService,],
  exports: [HelpersService,],
})
export class HelpersModule {}
