import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fruit } from '../entities/fruit.entity';
import { Variety } from './entities/variety.entity';

@Injectable()
export class VarietiesService {
  constructor(
    @InjectRepository(Variety)
    private readonly varietyRepository: Repository<Variety>,
    @InjectRepository(Fruit)
    private readonly fruitRepository: Repository<Fruit>,
  ) {}

  async createVariety(name: string, fruit: Fruit): Promise<Variety> {
    try {
      const variety = this.varietyRepository.create({ name, fruit });
      fruit.varieties.push(variety);
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

  private async saveVarietyAndFruit(
    variety: Variety,
    fruit: Fruit,
  ): Promise<void> {
    await this.varietyRepository.save(variety);
    await this.fruitRepository.save(fruit);
  }
}
