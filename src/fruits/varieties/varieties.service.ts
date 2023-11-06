import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
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

  async createVariety(createVarietyDto: CreateVarietyDto): Promise<Variety> {
    try {
      const fruit = await this.findFruitById(createVarietyDto.id);
      const variety = this.createVarietyInstance(createVarietyDto, fruit);
      await this.saveVarietyAndFruit(variety, fruit);
      return variety;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        console.error('An error occurred:', error);
        throw new InternalServerErrorException(
          'Ouch! An error occurred while processing your request',
        );
      }
    }
  }

  private async findFruitById(id: number): Promise<Fruit> {
    const fruit = await this.fruitRepository.findOne(id);
    if (!fruit) {
      throw new NotFoundException('Fruit not found');
    }
    return fruit;
  }

  private createVarietyInstance(
    createVarietyDto: CreateVarietyDto,
    fruit: Fruit,
  ): Variety {
    const variety = this.varietyRepository.create(createVarietyDto);
    fruit.varieties.push(variety);
    return variety;
  }

  private async saveVarietyAndFruit(
    variety: Variety,
    fruit: Fruit,
  ): Promise<void> {
    await this.varietyRepository.save(variety);
    await this.fruitRepository.save(fruit);
  }
}
