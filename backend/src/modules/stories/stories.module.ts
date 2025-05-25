import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { HelpersModule } from '../helpers/helpers.module';
import { PrismaModule } from '../prisma/prisma.module';
import { StoryCrudController } from './controllers/story-crud.controller';
import { StoryCrudService } from './services/story-crud.service';
import { StoryOperationsController } from './controllers/story-operations.controller';
import { StoryOperationsService } from './services/story-operations.service';

@Module({
  imports: [HelpersModule, PrismaModule],
  controllers: [StoryCrudController, StoryOperationsController],
  providers: [
    PrismaService,
    StoryCrudService,
    StoryOperationsService,
  ],
})
export class StoriesModule {}
