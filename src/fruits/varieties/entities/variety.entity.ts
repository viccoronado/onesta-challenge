import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Fruit } from '../../../fruits/entities/fruit.entity';

@Entity()
@Unique(['name', 'fruitId'])
export class Variety {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Fruit, (fruit) => fruit.varieties)
  fruit: Fruit;
}
