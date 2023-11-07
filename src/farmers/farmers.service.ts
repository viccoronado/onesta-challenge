import { NotFoundException } from '@nestjs/common';
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

  async findFarmerById(id: number): Promise<Farmer> {
    const farmer = await this.farmerRepository.findOne({ where: { id } });
    if (!farmer) {
      throw new NotFoundException('Farmer not found');
    }
    return farmer;
  }
}
