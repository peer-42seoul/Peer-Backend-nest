import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmController } from './alarm/alarm.controller';
import { AlarmService } from './alarm/alarm.service';
import { ConfigModule } from '@nestjs/config';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AlarmModule } from './alarm/alarm.module';
import { Temp } from './alarm/entity/temp.eitnty';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as admin from 'firebase-admin';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/.env-nest.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD/HH:mm:ss' }),
            winston.format.ms(),
            winston.format.splat(),
            nestWinstonModuleUtilities.format.nestLike('peer-back-nest', {
              colors: true,
            }),
          ),
        }),
        new DailyRotateFile({
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('peer-back-nest', {
              colors: false,
              prettyPrint: true,
            }),
          ),
          filename: 'logs/%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_DB,
      entities: [Temp],
      synchronize: false, // 프로덕션 환경에서는 false로 설정
      retryAttempts: 2,
    }),
    AlarmModule,
  ],
  controllers: [AppController, AlarmController],
  providers: [AppService, AlarmService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    admin.initializeApp({
      credential: admin.credential.cert('./env/firebase/peer-web-application-firebase-adminsdk-5rr4e-7c6fde0209.json'),
    })
  }
}
