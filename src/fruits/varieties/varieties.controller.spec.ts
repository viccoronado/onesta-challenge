import { Test, TestingModule } from '@nestjs/testing';
import { VarietiesController } from './varieties.controller';
import { VarietiesService } from './varieties.service';

describe('VarietiesController', () => {
  let controller: VarietiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VarietiesController],
      providers: [VarietiesService],
    }).compile();

    controller = module.get<VarietiesController>(VarietiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
