import { Body, Controller, Get, Inject, LoggerService, Post } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AlarmService } from './alarm.service';
import { Temp } from 'src/alarm/entity/temp.eitnty';

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

  @Post('/send-push')
  async sendPushNotifiaction(@Body() body: any) {
    const { token, title, message} = body;
    await this.alarmService.sendPushNoti(token, title, message);
    return {message: 'push message is sent successfully'};
  }
}
