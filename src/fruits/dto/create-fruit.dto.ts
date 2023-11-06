import { Variety } from '../varieties/entities/variety.entity';

export interface CreateFruitDto {
  id: number;
  name: string;
  variety: Variety;
}
