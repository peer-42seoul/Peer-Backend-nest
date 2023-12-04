import { Controller, Get, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AlarmService } from './alarm.service';
import { Temp } from 'src/entity/temp.eitnty';

@Controller('alarm')
export class AlarmController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly alarmService: AlarmService,
  ) {
    this.logger.log('AlarmController is initialized', 'Alarm Controller');
  }

  @Get()
  async getHome() {
    const data: Temp[] = await this.alarmService.findAll();

    this.logger.log('called getHome()', 'Alarm Controller');
    return data;
  }
}
