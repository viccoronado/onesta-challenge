import { Controller, Post, Body } from '@nestjs/common';
import { FarmersService } from './farmers.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';

@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmersService: FarmersService) {}

  @Post()
  create(@Body() createFarmerDto: CreateFarmerDto) {
    return this.farmersService.create(createFarmerDto);
  }
}
