import { IsString, IsEmail, IsArray } from 'class-validator';
import { Farmer } from 'src/farmers/entities/farmer.entity';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsArray()
  farmers: Farmer[];
}
