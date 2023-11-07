import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ValidationException } from 'src/exceptions/validation-exception';
import { EntityNotFoundError } from 'typeorm';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { Fruit } from './entities/fruit.entity';
import { FruitsService } from './fruits.service';
import { CreateVarietyDto } from './varieties/dto/create-variety.dto';
import { Variety } from './varieties/entities/variety.entity';
import { VarietiesService } from './varieties/varieties.service';
@Controller('fruits')
export class FruitsController {
  constructor(
    private readonly fruitsService: FruitsService,
    private readonly varietyService: VarietiesService,
  ) {}

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

  @Post('/:idFruit/variety')
  async createVariety(
    @Body() createVarietyDto: CreateVarietyDto,
    @Param() idFruit: number,
  ): Promise<Variety> {
    try {
      const fruit = await this.fruitsService.findFruitById(idFruit);
      const variety = await this.varietyService.createVariety(
        createVarietyDto.name,
        fruit,
      );
      return variety;
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
