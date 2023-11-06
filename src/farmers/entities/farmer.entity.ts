import { Client } from 'src/clients/entities/client.entity';
import { Field } from 'src/fields/entities/field.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Farmer {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @OneToMany(() => Field, (field) => field.farmer)
  fields: Field[];

  @OneToMany(() => Client, (client) => client.farmer)
  clients: Client[];
}
