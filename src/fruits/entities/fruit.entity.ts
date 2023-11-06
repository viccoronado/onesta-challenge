import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Unique,
} from 'typeorm';
import { Variety } from '../varieties/entities/variety.entity';

@Entity()
@Unique(['name'])
export class Fruit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Variety, (variety) => variety.fruit)
  varieties: Variety[];
}
