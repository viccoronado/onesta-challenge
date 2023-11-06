import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CsvImportService } from './csv.service';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvImportService: CsvImportService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file) {
    try {
      if (!file) {
        throw new HttpException(
          'Error: No file provided.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.csvImportService.importCsvData(file.path);

      return {
        message: 'CSV data uploaded and processed successfully ✅',
        result,
      };
    } catch (error) {
      return {
        message: 'Error uploading and processing CSV data ❌',
        error: error.message,
      };
    }
  }
}
