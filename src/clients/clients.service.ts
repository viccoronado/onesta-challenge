import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private customerRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    const client = this.customerRepository.create(CreateClientDto);
    return this.customerRepository.save(client);
  }
}
