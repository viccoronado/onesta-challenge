import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { CreateFarmerDto } from 'src/farmers/dto/create-farmer.dto';
import { Farmer } from 'src/farmers/entities/farmer.entity';
import { CreateFieldDto } from 'src/fields/dto/create-field.dto';
import { Field } from 'src/fields/entities/field.entity';
import { CreateFruitDto } from 'src/fruits/dto/create-fruit.dto';
import { Fruit } from 'src/fruits/entities/fruit.entity';
import { CreateVarietyDto } from 'src/fruits/varieties/dto/create-variety.dto';
import { Variety } from 'src/fruits/varieties/entities/variety.entity';
import { Client } from 'src/clients/entities/client.entity';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { async } from 'rxjs';

@Injectable()
export class CsvImportService {
  clientRepository: any;
  constructor(
    @InjectRepository(Farmer)
    private readonly farmerRepository: Repository<Farmer>,
    @InjectRepository(Client)
    private readonly customerRepository: Repository<Client>,
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
    @InjectRepository(Fruit)
    private readonly fruitRepository: Repository<Fruit>,
    @InjectRepository(Variety)
    private readonly varietyRepository: Repository<Variety>,
  ) {}

  async importCsvData(filePath: string) {
    return new Promise<void>((resolve, reject) => {
      const data = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', async (row) => {
          const farmerDto: CreateFarmerDto = {
            name: row.farmerName,
            email: row.farmerEmail,
            age: 0,
            fieldIds: [],
            clientIds: [],
          };

          const clientDto: CreateClientDto = {
            name: row.customerName,
            email: row.customerEmail,
          };

          const fieldDto: CreateFieldDto = {
            name: row.fieldName,
            location: row.fieldLocation,
            size: 0,
            farmerId: 0,
          };

          const fruitDto: CreateFruitDto = {
            name: row.fruitName,
            id: 0,
            variety: new Variety(),
          };

          const varietyDto: CreateVarietyDto = {
            name: row.varietyName,
            id: 0,
            fruit: new Fruit(),
          };

          data.push({ farmerDto, clientDto, fieldDto, fruitDto, varietyDto });
        })
        .on('end', async () => {
          for (const {
            farmerDto,
            clientDto,
            fieldDto,
            fruitDto,
            varietyDto,
          } of data) {
            const farmer = await this.createOrUpdateFarmer(farmerDto);
            const client = await this.createOrUpdateClient(clientDto);
            const field = await this.createOrUpdateField(fieldDto);
            const fruit = await this.createOrUpdateFruit(fruitDto);
            const variety = await this.createOrUpdateVariety(varietyDto, fruit);
          }
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  async createOrUpdateFarmer(
    createFarmerDto: CreateFarmerDto,
  ): Promise<Farmer> {
    const { email } = createFarmerDto;

    const existingFarmer = await this.farmerRepository.findOne({
      where: { email: createFarmerDto.email },
    });

    if (existingFarmer) {
      throw new NotFoundException('Farmer with the same email already exists.');
    }

    const newFarmer = this.farmerRepository.create(createFarmerDto);
    const savedFarmer = await this.farmerRepository.save(newFarmer);

    return savedFarmer;
  }

  async createOrUpdateClient(
    createClientDto: CreateClientDto,
  ): Promise<Client> {
    const { email } = createClientDto;

    const existingClient = await this.clientRepository.findOne({ email });

    if (existingClient) {
      throw new NotFoundException('Client with the same email already exists.');
    }

    const newClient = this.clientRepository.create(createClientDto);

    const savedClient = await this.clientRepository.save(newClient);

    return savedClient;
  }

  async createOrUpdateField(createFieldDto: CreateFieldDto): Promise<Field> {
    const { name, location } = createFieldDto;

    const existingField = await this.fieldRepository.findOne({
      where: { name, location },
    });

    if (existingField) {
      throw new NotFoundException(
        'Field with the same name and location combination already exists.',
      );
    }

    const newField = this.fieldRepository.create(createFieldDto);
    const savedField = await this.fieldRepository.save(newField);

    return savedField;
  }

  private async createOrUpdateFruit(
    createFruitDto: CreateFruitDto,
  ): Promise<Fruit> {
    const { name } = createFruitDto;
    const existingFruit = await this.fruitRepository.findOne({
      where: { name: createFruitDto.name },
    });
    if (existingFruit) {
      throw new NotFoundException('Fruit with the same name already exists.');
    }
    const newFruit = this.fruitRepository.create(createFruitDto);
    const savedFruit = await this.fruitRepository.save(newFruit);

    return savedFruit;
  }

  async createOrUpdateVariety(
    createVarietyDto: CreateVarietyDto,
    fruit: Fruit,
  ): Promise<Variety> {
    const { name } = createVarietyDto;

    const existingVariety = await this.varietyRepository.findOne({
      where: { name, fruit },
    });

    if (existingVariety) {
      throw new NotFoundException(
        'Variety with the same name within the fruit already exists.',
      );
    }

    const newVariety = this.varietyRepository.create({
      name,
      fruit,
    });
    const savedVariety = await this.varietyRepository.save(newVariety);

    return savedVariety;
  }
}
