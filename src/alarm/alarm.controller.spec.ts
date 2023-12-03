import { Test, TestingModule } from '@nestjs/testing';
import { AlarmController } from './alarm.controller';
import { AlarmService } from './alarm.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

describe('AlarmController', () => {
  let controller: AlarmController;
  let service: AlarmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlarmController],
      providers: [
        {
          provide: AlarmService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(`[
      {
          "id": 1,
          "message": "hello word!",
          "created_at": "2023-12-03T05:52:39.000Z",
          "updated_at": "2023-12-03T05:52:44.000Z"
      }
  ]`),
          },
        },
        {
          provide: WINSTON_MODULE_NEST_PROVIDER,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
            verbose: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AlarmController>(AlarmController);
    service = module.get<AlarmService>(AlarmService);
  });

  it('shoud be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of temps', async () => {
    const result = await controller.getHome();
    expect(result).toEqual(`[
      {
          "id": 1,
          "message": "hello word!",
          "created_at": "2023-12-03T05:52:39.000Z",
          "updated_at": "2023-12-03T05:52:44.000Z"
      }
  ]`);
    expect(service.findAll).toHaveBeenCalled();
  });
});
