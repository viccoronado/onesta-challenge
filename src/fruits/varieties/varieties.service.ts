import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fruit } from '../entities/fruit.entity';
import { CreateVarietyDto } from './dto/create-variety.dto';
import { Variety } from './entities/variety.entity';

@Injectable()
export class VarietiesService {
  constructor(
    @InjectRepository(Fruit)
    private readonly fruitRepository: Repository<Fruit>,
    @InjectRepository(Variety)
    private readonly varietyRepository: Repository<Variety>,
  ) {}

  async createVariety(createVarietyDto: CreateVarietyDto) {
    const fruit = await this.fruitRepository.findOne({
      where: { id: createVarietyDto.id },
    });
    const variety = this.createVarietyInstance(createVarietyDto, fruit);
    await this.saveVarietyAndFruit(variety, fruit);

    return variety;
  }

  private async findFruitById(id: number) {
    const fruit = await this.fruitRepository.findOne({
      where: { id: id },
    });
    if (!fruit) {
      throw new Error('Fruit not found');
    }
    return fruit;
  }

  private createVarietyInstance(
    createVarietyDto: CreateVarietyDto,
    fruit: Fruit,
  ) {
    const variety = this.varietyRepository.create(createVarietyDto);
    fruit.varieties.push(variety);
    return variety;
  }

  private async saveVarietyAndFruit(variety: Variety, fruit: Fruit) {
    await this.varietyRepository.save(variety);
    await this.fruitRepository.save(fruit);
  }
}
