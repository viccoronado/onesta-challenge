import { Module } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { FruitsController } from './fruits.controller';
import { VarietiesModule } from './varieties/varieties.module';

@Module({
  controllers: [FruitsController],
  providers: [FruitsService],
  imports: [VarietiesModule],
})
export class FruitsModule {}
