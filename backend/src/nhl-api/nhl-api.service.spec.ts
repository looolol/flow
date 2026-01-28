import { Test, TestingModule } from '@nestjs/testing';
import { NhlApiService } from './nhl-api.service';

describe('NhlApiService', () => {
  let service: NhlApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NhlApiService],
    }).compile();

    service = module.get<NhlApiService>(NhlApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
