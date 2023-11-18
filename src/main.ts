import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {
  WINSTON_MODULE_NEST_PROVIDER,
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
dotenv.config();

async function bootstrap() {
  const instance = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      nestWinstonModuleUtilities.format.nestLike('peer-back-nest', {
        colors: true,
        prettyPrint: true,
      }),
    ),
  });
  //   const app = await NestFactory.create(AppModule, {
  //     logger: WinstonModule.createLogger({ instance }),
  //   });
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(process.env.SEERVER_PORT);
}
bootstrap();
