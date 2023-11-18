import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlramController } from './alram/alram.controller';
import { AlramService } from './alram/alram.service';

@Module({
  imports: [],
  controllers: [AppController, AlramController],
  providers: [AppService, AlramService],
})
export class AppModule {}
