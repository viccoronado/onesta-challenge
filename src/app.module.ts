import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { CropsModule } from './crops/crops.module';
import { FarmersModule } from './farmers/farmers.module';
import { FieldsModule } from './fields/fields.module';
import { Fruit } from './fruits/entities/fruit.entity';
import { FruitsModule } from './fruits/fruits.module';
import { Variety } from './fruits/varieties/entities/variety.entity';

@Module({
  imports: [
    FruitsModule,
    CropsModule,
    FarmersModule,
    FieldsModule,
    ClientsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydatabase.db',
      entities: [Fruit, Variety],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Fruit, Variety]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
