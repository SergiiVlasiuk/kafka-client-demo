import { Module } from '@nestjs/common';
import { DemoConsumerController } from './demo-consumer.controller';

@Module({
  controllers: [DemoConsumerController]
})
export class DemoConsumerModule {}
