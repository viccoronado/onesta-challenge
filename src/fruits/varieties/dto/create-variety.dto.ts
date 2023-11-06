import { Fruit } from 'src/fruits/entities/fruit.entity';

export interface CreateVarietyDto {
  id: number;
  name: string;
  fruit: Fruit;
}
