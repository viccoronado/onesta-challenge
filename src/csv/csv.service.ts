import { Injectable } from '@nestjs/common';
import { CreateCsvDto } from './dto/create-csv.dto';
import { UpdateCsvDto } from './dto/update-csv.dto';

@Injectable()
export class CsvService {
  create(createCsvDto: CreateCsvDto) {
    return 'This action adds a new csv';
  }

  findAll() {
    return `This action returns all csv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} csv`;
  }

  update(id: number, updateCsvDto: UpdateCsvDto) {
    return `This action updates a #${id} csv`;
  }

  remove(id: number) {
    return `This action removes a #${id} csv`;
  }
}
