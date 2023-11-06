import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Farmer } from 'src/farmers/entities/farmer.entity';
import { Repository } from 'typeorm';
import { Field } from './entities/field.entity';

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(Field)
    private fieldRepository: Repository<Field>,
  ) {}

  async createField(
    name: string,
    location: string,
    farmer: Farmer,
  ): Promise<Field> {
    try {
      const field = this.createFieldEntity(name, location, farmer);
      const savedField = await this.saveField(field);
      return savedField;
    } catch (error) {
      console.error('An error occurred:', error);
      throw new InternalServerErrorException(
        'An error occurred while processing your request',
      );
    }
  }
  createFieldEntity(name: string, location: string, farmer: Farmer) {
    return this.fieldRepository.create({ name, location, farmer });
  }

  private async saveField(field: Field): Promise<Field> {
    return this.fieldRepository.save(field);
  }
}
