import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Temp } from 'src/entity/temp.eitnty';
import { Repository } from 'typeorm';

@Injectable()
export class AlramService {
  constructor(
    @InjectRepository(Temp)
    private tempRepository: Repository<Temp>,
  ) {}

  async findAll(): Promise<Temp[]> {
    return this.tempRepository.find();
  }
}
