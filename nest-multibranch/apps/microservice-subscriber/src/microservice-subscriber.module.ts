import { Module } from '@nestjs/common';
import { MicroserviceSubscriberController } from './microservice-subscriber.controller';

@Module({
  imports: [],
  controllers: [MicroserviceSubscriberController],
})
export class MicroserviceSubscriberModule {}
