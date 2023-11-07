import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { Fruit } from './entities/fruit.entity';

@Injectable()
export class FruitsService {
  constructor(
    @InjectRepository(Fruit)
    private fruitRepository: Repository<Fruit>,
  ) {}

  async createFruit(createFruitDto: CreateFruitDto) {
    try {
      const fruit = this.fruitRepository.create(createFruitDto);
      const savedFruit = await this.fruitRepository.save(fruit);
      return savedFruit;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Fruit not found!');
      } else {
        console.error('An error occurred:', error);
        throw new InternalServerErrorException(
          'Oops! An error occurred while processing your request',
        );
      }
    }
  }

  async findFruitById(id: number): Promise<Fruit> {
    const fruit = await this.fruitRepository.findOne({ where: { id } });
    if (!fruit) {
      throw new NotFoundException('Fruit not found');
    }
    return fruit;
  }
}
