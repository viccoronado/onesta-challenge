import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateFieldDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @IsNumber()
  @IsNotEmpty()
  farmerId: number;

  @IsString()
  @IsNotEmpty()
  location: string;
}
