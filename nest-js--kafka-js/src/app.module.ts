import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoProducerModule } from './demo-producer';
import { DemoConsumerModule } from './demo-consumer';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    DemoProducerModule,
    DemoConsumerModule,
    ScheduleModule.forRoot()
  ],
})
export class AppModule { }
