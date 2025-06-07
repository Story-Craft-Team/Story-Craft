import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/deffault/prisma/prisma.service';
import { UserCrudService } from './services/user-crud.service';
import { HelpersModule } from '../deffault/helpers/helpers.module';
import { PrismaModule } from 'src/modules/deffault/prisma/prisma.module';
import { UserOperationsService } from './services/user-operations.service';
import { UserFollowsService } from './services/user-follows.service';
import { BcryptService } from 'src/modules/deffault/bcrypt/services/bcrypt.service';
import { UserAuthService } from './services/user-auth.service';
import { AuthModule } from 'src/modules/deffault/auth/auth.module';
import { UserAuthController } from './controllers/user-auth.controller';
import { UserCrudController } from './controllers/user-crud.controller';
import { UserOperationsController } from './controllers/user-operations.controller';
import { UserFollowsController } from './controllers/user-follows.controller';
import { UserStoriesController } from './controllers/user-stories.controller';
import { UserStoriesService } from './services/user-stories.service';
import { UserPlansController } from './controllers/user-plans.controller';
import { UserPlansService } from './services/user-plans.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from 'src/common/strategies/google.strategy';
import { UserAuthHelperService } from '../deffault/helpers/services/user-auth.helpers.service';

@Module({
  imports: [HelpersModule, PrismaModule, AuthModule, ConfigModule,],
  controllers: [
    UserCrudController,
    UserAuthController,
    UserFollowsController,
    UserOperationsController,
    UserStoriesController,
    UserPlansController,
  ],
  providers: [
    PrismaService,
    UserCrudService,
    UserOperationsService,
    UserFollowsService,
    BcryptService,
    UserAuthService,
    UserStoriesService,
    UserPlansService,
    GoogleStrategy,
    UserAuthHelperService,
  ],
})
export class UsersModule {}
