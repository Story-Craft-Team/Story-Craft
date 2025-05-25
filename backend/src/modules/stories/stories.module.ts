import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/default/prisma/prisma.service';
import { HelpersModule } from '../helpers/helpers.module';
import { PrismaModule } from '../default/prisma/prisma.module';
import { StoryCrudController } from './controllers/story-crud.controller';
import { StoryCrudService } from './services/story-crud.service';
import { StoryOperationsController } from './controllers/story-operations.controller';
import { StoryOperationsService } from './services/story-operations.service';
import { StoryLikesController } from './controllers/story-likes.controller';
import { StoryLikesService } from './services/story-likes.service';

@Module({
  imports: [HelpersModule, PrismaModule],
  controllers: [
    StoryCrudController,
    StoryOperationsController,
    StoryLikesController,
  ],
  providers: [
    PrismaService,
    StoryCrudService,
    StoryOperationsService,
    StoryLikesService,
  ],
})
export class StoriesModule {}
