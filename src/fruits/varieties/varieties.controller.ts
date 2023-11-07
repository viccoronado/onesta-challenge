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
}
