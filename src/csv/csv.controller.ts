import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { createReadStream } from 'fs';
import csvParser from 'csv-parser';
import { getManager, EntityManager } from 'typeorm';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { Client } from 'src/clients/entities/client.entity';
import { CreateFarmerDto } from 'src/farmers/dto/create-farmer.dto';
import { Farmer } from 'src/farmers/entities/farmer.entity';
import { CreateFieldDto } from 'src/fields/dto/create-field.dto';
import { Field } from 'src/fields/entities/field.entity';
import { CreateFruitDto } from 'src/fruits/dto/create-fruit.dto';
import { Fruit } from 'src/fruits/entities/fruit.entity';
import { CreateVarietyDto } from 'src/fruits/varieties/dto/create-variety.dto';
import { Variety } from 'src/fruits/varieties/entities/variety.entity';
import { resolve } from 'dns';
import stream from 'stream';

@Controller('upload')
export class UploadController {
  constructor(private readonly entityManager: EntityManager) {}

  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException('Error: no file provided.-');
      }

      const farmers: CreateFarmerDto[] = [];
      const clients: CreateClientDto[] = [];
      const fields: CreateFieldDto[] = [];
      const fruits: CreateFruitDto[] = [];
      const varieties: CreateVarietyDto[] = [];

      await new Promise<void>((resolve, reject) => {
        const stream = createReadStream(file.path)
          .pipe(csvParser())
          .on('data', (row) => 
            farmers.push(farmers);
            clients.push(client);
            fields.push(field);
            fruits.push(fruit);
            varieties.push(variety);
          })
          .on('end', () => {
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });

        stream.on('finish', async () => {
          const transactionalEntityManager = getManager();
          await transactionalEntityManager.transaction(
            async (transactionalEntityManager) => {
              await this.importDataWithUniquenessCheck(
                farmers,
                transactionalEntityManager,
                Farmer,
                'name',
              );
              await this.importDataWithUniquenessCheck(
                clients,
                transactionalEntityManager,
                Client,
                'email',
              );
              await this.importDataWithUniqueCombinationCheck(
                fields,
                transactionalEntityManager,
                Field,
                ['name', 'location'],
              );
              await this.importDataWithUniquenessCheck(
                fruits,
                transactionalEntityManager,
                Fruit,
                'name',
              );
              await this.importDataWithUniqueCombinationCheck(
                varieties,
                transactionalEntityManager,
                Variety,
                ['name'],
              );
            },
          );
        });

        stream.on('error', (error) => {
          reject(error);
        });
      });

      return { message: 'CSV data uploaded and processed successfully ✅' };
    } catch (error) {
      throw new BadRequestException(`Error: ${error.message}`);
    }
  }