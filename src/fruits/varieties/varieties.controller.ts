import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VarietiesService } from './varieties.service';
import { CreateVarietyDto } from './dto/create-variety.dto';
import { UpdateVarietyDto } from './dto/update-variety.dto';

@Controller('varieties')
export class VarietiesController {
  constructor(private readonly varietiesService: VarietiesService) {}

  @Post()
  create(@Body() createVarietyDto: CreateVarietyDto) {
    return this.varietiesService.create(createVarietyDto);
  }

  @Get()
  findAll() {
    return this.varietiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.varietiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVarietyDto: UpdateVarietyDto) {
    return this.varietiesService.update(+id, updateVarietyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.varietiesService.remove(+id);
  }
}
