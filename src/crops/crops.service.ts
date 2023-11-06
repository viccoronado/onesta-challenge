import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCropDto } from './dto/create-crop.dto';
import { Crop } from './entities/crop.entity';


@Injectable()
export class CropsService {

  constructor(
    @InjectRepository(Crop)
    private cropRepository: Repository<Crop>,
  ) {}

  create(createCropDto: CreateCropDto) {
    const crop = this.cropRepository.create({CreateCropDto);
    return this.cropRepository.save(crop);
  }
}
