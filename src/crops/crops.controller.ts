import { Controller, Post, Body } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  create(@Body() createCropDto: CreateCropDto) {
    return this.cropsService.create(createCropDto);
  }
}
