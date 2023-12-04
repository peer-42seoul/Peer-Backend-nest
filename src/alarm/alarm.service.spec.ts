import { Test, TestingModule } from '@nestjs/testing';
import { AlarmService } from './alarm.service';
import { Repository } from 'typeorm';
import { Temp } from '../entity/temp.eitnty';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AlarmService', () => {
  let service: AlarmService;
  let mockRepository: Repository<Temp>;
  const mockData = `[
    {
        "id": 1,
        "message": "hello word!",
        "created_at": "2023-12-03T05:52:39.000Z",
        "updated_at": "2023-12-03T05:52:44.000Z"
    }
]`;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlarmService,
        {
          provide: getRepositoryToken(Temp),
          useValue: {
            find: jest.fn().mockResolvedValue(mockData),
          },
        },
      ],
    }).compile();

    service = module.get<AlarmService>(AlarmService);
    mockRepository = module.get<Repository<Temp>>(getRepositoryToken(Temp));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of temps', async () => {
    const result = await service.findAll();
    expect(result).toBe(mockData);
    expect(mockRepository.find).toHaveBeenCalled();
  });
});
