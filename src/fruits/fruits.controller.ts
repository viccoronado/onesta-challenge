import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationException } from 'src/exceptions/validation-exception';
import { EntityNotFoundError } from 'typeorm';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { Fruit } from './entities/fruit.entity';
import { FruitsService } from './fruits.service';
@Controller('fruits')
export class FruitsController {
  constructor(private readonly fruitsService: FruitsService) {}

  @Post()
  async create(@Body() createFruitDto: CreateFruitDto): Promise<Fruit> {
    try {
      const createdFruit = await this.fruitsService.createFruit(createFruitDto);
      return createdFruit;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException('Fruit not found', HttpStatus.NOT_FOUND);
      } else if (error instanceof ValidationException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        console.error('An error occurred:', error);
        throw new HttpException(
          'An error occurred while processing your request',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
