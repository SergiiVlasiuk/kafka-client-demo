import { Module } from '@nestjs/common';
import { RegistryProvider } from '../configurations';
import { DemoProducerController, DemoProducerService } from './';

@Module({
  controllers: [DemoProducerController],
  providers: [
    DemoProducerService,
    RegistryProvider,
  ]
})
export class DemoProducerModule {}
