import { Test, TestingModule } from '@nestjs/testing';
import { AlramController } from './alram.controller';

describe('AlramController', () => {
  let controller: AlramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlramController],
    }).compile();

    controller = module.get<AlramController>(AlramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
