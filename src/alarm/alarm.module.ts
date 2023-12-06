import { Module } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmController } from './alarm.controller';
import { Temp } from './entity/temp.eitnty';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [TypeOrmModule.forFeature([Temp]), WinstonModule],
  exports: [TypeOrmModule],
  providers: [AlarmService],
  controllers: [AlarmController],
})
export class AlarmModule {}
