import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.eitnty';
import { Repository } from 'typeorm';

@Injectable()
export class AlramService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
}
