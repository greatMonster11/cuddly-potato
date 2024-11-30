import { Test, TestingModule } from '@nestjs/testing';
import { InMemService } from './in-mem.service';

describe('InMemService', () => {
  let service: InMemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemService],
    }).compile();

    service = module.get<InMemService>(InMemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
