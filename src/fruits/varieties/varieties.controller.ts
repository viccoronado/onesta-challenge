import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVarietyDto } from './dto/create-variety.dto';
import { Variety } from './entities/variety.entity';
import { VarietiesService } from './varieties.service';

@Controller('varieties')
export class VarietiesController {
  constructor(private readonly varietiesService: VarietiesService) {}

  @Post()
  async create(@Body() createVarietyDto: CreateVarietyDto): Promise<Variety> {
    try {
      const createdVariety =
        await this.varietiesService.createVariety(createVarietyDto);
      return createdVariety;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('Variety not found', HttpStatus.NOT_FOUND);
      } else if (error instanceof InternalServerErrorException) {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        console.error('An error occurred:', error);
        throw new HttpException(
          'Hey! Sorry, an error occurred while processing your request',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
