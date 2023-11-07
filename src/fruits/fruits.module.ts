import { Module } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { FruitsController } from './fruits.controller';
import { VarietiesModule } from './varieties/varieties.module';

@Module({
  imports: [VarietiesModule],
  controllers: [FruitsController],
  providers: [FruitsService],
})
export class FruitsModule {}
