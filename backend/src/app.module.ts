import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/default/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { HelpersModule } from './modules/helpers/helpers.module';
import { AuthModule } from './modules/auth/auth.module';
import { BcryptModule } from './modules/bcrypt/bcrypt.module';
import { StoriesModule } from './modules/stories/stories.module';
import { ScenesModule } from './modules/scenes/scenes.module';
import { ChoicesModule } from './modules/choices/choices.module';
@Module({
  imports: [
    PrismaModule,
    UsersModule,
    HelpersModule,
    AuthModule,
    BcryptModule,
    StoriesModule,
    ScenesModule,
    ChoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
