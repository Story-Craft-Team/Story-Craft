import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/default/prisma/prisma.service';
import { HelpersModule } from '../helpers/helpers.module';
import { PrismaModule } from '../default/prisma/prisma.module';
import { SceneCrudController } from './controllers/scene-crud.controller';
import { SceneCrudService } from './services/scene-crud.service';
import { SceneOperationsController } from './controllers/scene-operations.controller';
import { SceneOperationsService } from './services/scene-operations.service';
@Module({
  imports: [HelpersModule, PrismaModule],
  controllers: [SceneCrudController, SceneOperationsController],
  providers: [PrismaService, SceneCrudService, SceneOperationsService],
})
export class ScenesModule {}
