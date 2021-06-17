import { Test, TestingModule } from '@nestjs/testing';
import { DemoProducerService } from './demo-producer.service';

describe('DemoProducerService', () => {
  let service: DemoProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemoProducerService],
    }).compile();

    service = module.get<DemoProducerService>(DemoProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
