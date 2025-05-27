import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/deffault/prisma/prisma.service';
import { HelpersModule } from '../deffault/helpers/helpers.module';
import { PrismaModule } from '../deffault/prisma/prisma.module';
import { ChoiceCrudController } from './controllers/choice-crud.controller';
import { ChoiceCrudService } from './services/choice-crud.service';
import { ChoiceOperationsService } from './services/choice-operations.service';
import { ChoiceOperationsController } from './controllers/choice-operations.controller';
@Module({
  imports: [HelpersModule, PrismaModule],
  controllers: [
    ChoiceCrudController,
    ChoiceOperationsController,
  ],
  providers: [
    PrismaService,
    ChoiceCrudService,
    ChoiceOperationsService,
  ],
})
export class ChoicesModule {}
