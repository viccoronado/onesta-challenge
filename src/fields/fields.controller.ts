import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { Field } from './entities/field.entity';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post()
  async create(@Body() createFieldDto: CreateFieldDto): Promise<Field> {
    try {
      const createdField = await this.fieldsService.createField(createFieldDto);
      return createdField;
    } catch (error) {
      this.handleControllerError(error);
    }
  }

  private handleControllerError(error: Error) {
    if (error instanceof HttpException) {
      throw error;
    }

    console.error('An error occurred:', error);
    throw new HttpException(
      'An error occurred while processing your request',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
