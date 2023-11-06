import { Controller, Get } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    try {
      const result = await this.appService.getHello();
      return result;
    } catch (error) {
      console.error('Sorry, an error occurred:', error);
      throw new InternalServerErrorException(
        'We are sorry, an error occurred while processing your request',
      );
    }
  }
}
