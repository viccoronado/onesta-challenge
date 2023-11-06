import { Fruit } from 'src/fruits/entities/fruit.entity';
import { Variety } from 'src/fruits/varieties/entities/variety.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Crop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Variety, (variety) => variety.fruits)
  varieties: Variety[];

  @ManyToMany(() => Crop, (fruit) => fruit.fruits)
  fruits: Fruit[];
}
