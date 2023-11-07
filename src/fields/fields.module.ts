import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { FarmersModule } from 'src/farmers/farmers.module';

@Module({
  imports: [FarmersModule],
  controllers: [FieldsController],
  providers: [FieldsService],
})
export class FieldsModule {}
