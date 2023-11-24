import { Module } from '@nestjs/common';
import { AlramService } from './alram.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlramController } from './alram.controller';
import { Temp } from 'src/entity/temp.eitnty';

@Module({
  imports: [TypeOrmModule.forFeature([Temp])],
  exports: [TypeOrmModule],
  providers: [AlramService],
  controllers: [AlramController],
})
export class AlramModule {}
