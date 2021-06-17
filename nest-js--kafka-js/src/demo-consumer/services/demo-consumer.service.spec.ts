import { Test, TestingModule } from '@nestjs/testing';
import { DemoConsumerService } from './demo-consumer.service';

describe('DemoConsumerService', () => {
  let service: DemoConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemoConsumerService],
    }).compile();

    service = module.get<DemoConsumerService>(DemoConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
