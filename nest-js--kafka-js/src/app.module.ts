import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoProducerModule } from './demo-producer/demo-producer.module';
import { DemoKafkaModule } from './demo-kafka/demo-kafka.module';
import { DemoConsumerModule } from './demo-consumer/demo-consumer.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    DemoProducerModule,
    DemoKafkaModule,
    DemoConsumerModule,
    ScheduleModule.forRoot()
  ],
})
export class AppModule { }
