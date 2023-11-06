import { Module } from '@nestjs/common';
import { VarietiesService } from './varieties.service';
import { VarietiesController } from './varieties.controller';

@Module({
  controllers: [VarietiesController],
  providers: [VarietiesService],
})
export class VarietiesModule {}
