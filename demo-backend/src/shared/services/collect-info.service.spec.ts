import { Test, TestingModule } from '@nestjs/testing';
import { CollectInfoService } from './collect-info.service';

describe('CollectInfoService', () => {
  let service: CollectInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectInfoService],
    }).compile();

    service = module.get<CollectInfoService>(CollectInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('collectData', () => {
    test('should return stub with 2 items', () => {
      const actual = service.collectData();

      expect(actual.length).toEqual(2);
    });
  });
});
