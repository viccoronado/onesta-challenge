import { Test, TestingModule } from '@nestjs/testing';
import { VarietiesService } from './varieties.service';

describe('VarietiesService', () => {
  let service: VarietiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VarietiesService],
    }).compile();

    service = module.get<VarietiesService>(VarietiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
