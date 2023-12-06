import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Temp } from './entity/temp.eitnty';
import { Repository } from 'typeorm';
import * as admin from 'firebase-admin';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(Temp)
    private tempRepository: Repository<Temp>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {
  }

  public async findAll(): Promise<Temp[]> {
    return this.tempRepository.find();
  }

  // public async sendPushNoti(token: string, title: string, body: string): Promise<void> {
  //   const message = {
  //     notification: {
  //       title: title,
  //       body: body,
  //     },
  //     token: token,
  //   }
  //   try {
  //     await admin.messaging().send(message);
  //     this.logger.log('message send sucessfully');
  //   } catch (error) {
  //     this.logger.error('send message is faild', error);
  //   }
  // }
    public async sendPushNoti(token: string, title: string, body: string): Promise<void> {
      const icon =  "https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567593192/noticon/za5oft8gpi5yabrlvgfp.gif";
      const click = "https://www.peer-test.co.kr";
    const message = {
      webpush: {
      notification: {
        title: title,
        body: body,
        icon: icon,
        click_action: click,
        data: {
          link: "https://www.peer-test.co.kr"
        },
      },
      headers: {
        Urgency: "High", 
      },
    },
      token: token,
    };
    try {
      await admin.messaging().send(message);
      this.logger.log('message send sucessfully');
    } catch (error) {
      this.logger.error('send message is faild', error);
    }
  }
}
