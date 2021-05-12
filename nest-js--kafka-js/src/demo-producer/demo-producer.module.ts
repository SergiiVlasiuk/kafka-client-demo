import { Module } from '@nestjs/common';
import { DemoProducerController } from './demo-producer.controller';

@Module({
  controllers: [DemoProducerController]
})
export class DemoProducerModule {}
