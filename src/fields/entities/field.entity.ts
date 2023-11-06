import { Farmer } from 'src/farmers/entities/farmer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name', 'location'])
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  location: string;

  @ManyToOne(() => Farmer, (farmer) => farmer.fields)
  farmer: Farmer;
}
