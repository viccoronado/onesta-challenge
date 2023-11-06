import { IsString, IsArray } from 'class-validator';

export class CreateCropDto {
  @IsString()
  name: string;

  @IsArray()
  varietyIds: number[];

  @IsArray()
  fruitIds: number[];
}
