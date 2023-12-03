import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Temp } from '../entity/temp.eitnty';
import { Repository } from 'typeorm';

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(Temp)
    private tempRepository: Repository<Temp>,
  ) {}

  async findAll(): Promise<Temp[]> {
    return this.tempRepository.find();
  }
}
