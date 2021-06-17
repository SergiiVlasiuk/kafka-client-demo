import { Module } from '@nestjs/common';
import { DemoProducerController, DemoProducerService } from './';

@Module({
  controllers: [DemoProducerController],
  providers: [DemoProducerService]
})
export class DemoProducerModule {}
