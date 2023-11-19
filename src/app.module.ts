import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlramController } from './alram/alram.controller';
import { AlramService } from './alram/alram.service';
import { ConfigModule } from '@nestjs/config';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AlramModule } from './alram/alram.module';
import { Temp } from './entity/temp.eitnty';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
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
        // new winston.transports.File({
        //   filename: 'error.log',
        //   level: 'error',
        // }),
        new (require('winston-daily-rotate-file'))({
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
    }),
    AlramModule,
  ],
  controllers: [AppController, AlramController],
  providers: [AppService, AlramService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
