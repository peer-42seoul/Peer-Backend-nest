import { Module } from '@nestjs/common';
import { AlramService } from './alram.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.eitnty';
import { AlramController } from './alram.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  providers: [AlramService],
  controllers: [AlramController],
})
export class AlramModule {}
