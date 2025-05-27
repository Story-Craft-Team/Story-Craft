import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/deffault/prisma/prisma.service';
import { HelpersModule } from '../deffault/helpers/helpers.module';
import { PrismaModule } from '../deffault/prisma/prisma.module';
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
