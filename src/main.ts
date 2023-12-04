import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  console.log(process.env.SERVER_PORT);
  app.enableCors({
    origin: process.env.FRONT_URL
  });
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
