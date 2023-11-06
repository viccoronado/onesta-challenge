import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farmer } from 'src/farmers/entities/farmer.entity';
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
      this.handleServiceError(error);
    }
  }

  private createFieldEntity(
    name: string,
    location: string,
    farmer: Farmer,
  ): Field {
    return this.fieldRepository.create({ name, location, farmer });
  }

  private async saveField(field: Field): Promise<Field> {
    try {
      return await this.fieldRepository.save(field);
    } catch (error) {
      this.handleServiceError(error);
    }
  }

  private handleServiceError(error: Error) {
    console.error('An error occurred:', error);
    throw new InternalServerErrorException(
      'An error occurred while processing your request',
    );
  }
}
