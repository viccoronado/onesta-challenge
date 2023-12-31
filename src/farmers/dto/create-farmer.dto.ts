import { IsString, IsInt, IsArray } from 'class-validator';

export class CreateFarmerDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsInt()
  age: number;

  @IsArray()
  fieldIds: number[];

  @IsArray()
  clientIds: number[];
}
