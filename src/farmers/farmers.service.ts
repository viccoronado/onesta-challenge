import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { Farmer } from './entities/farmer.entity';

@Injectable()
export class FarmersService {
  constructor(
    @InjectRepository(Farmer)
    private farmerRepository: Repository<Farmer>,
  ) {}

  create(createFarmerDto: CreateFarmerDto) {
    const farmer = this.farmerRepository.create(CreateFarmerDto);
    return this.farmerRepository.save(farmer);
  }
}
