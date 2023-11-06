import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { Fruit } from './entities/fruit.entity';

@Injectable()
export class FruitsService {
  constructor(
    @InjectRepository(Fruit)
    private fruitRepository: Repository<Fruit>,
  ) {}

  async createFruit(createFruitDto: CreateFruitDto) {
    const fruit = await this.fruitRepository.create(createFruitDto);
    return this.fruitRepository.save(fruit);
  }
}
