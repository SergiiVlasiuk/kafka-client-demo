import { Module } from '@nestjs/common';
import { DemoConsumerController, DemoConsumerService } from './';

@Module({
  controllers: [DemoConsumerController],
  providers: [DemoConsumerService]
})
export class DemoConsumerModule {}
