import { Controller, Get, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AlramService } from './alram.service';
import { Temp } from 'src/entity/temp.eitnty';
import { get } from 'http';

@Controller('alram')
export class AlramController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly alramService: AlramService,
  ) {
    logger.log('AlramController is initialized');
  }

  @Get()
  async getHome() {
    const data: Temp[] = await this.alramService.findAll();
    return data;
  }
}
