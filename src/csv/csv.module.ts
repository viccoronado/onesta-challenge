import { Module } from '@nestjs/common';
import { CsvImportService } from './csv.service';
import { CsvController } from './csv.controller';

@Module({
  controllers: [CsvController],
  providers: [CsvImportService],
})
export class CsvModule {}
