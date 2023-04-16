import { Test, TestingModule } from '@nestjs/testing';
import { EntriesController } from './ss-register.controller';
import { EntriesService } from './ss-register.service';

describe('EntriesController', () => {
  let controller: EntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntriesController],
      providers: [EntriesService],
    }).compile();

    controller = module.get<EntriesController>(EntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
