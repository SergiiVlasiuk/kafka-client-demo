import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkajsMicroserviceConfig, RegistryProvider } from '../configurations';
import { DemoConsumerController, DemoConsumerService } from './';

@Module({
  controllers: [DemoConsumerController],
  providers: [
    DemoConsumerService,
    RegistryProvider,
  ]
})
export class DemoConsumerModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DemoConsumerModule.name);

  @Client(kafkajsMicroserviceConfig)
  client: ClientKafka

  async onModuleInit() {
      this.logger.debug('onModuleInit')
      this.client.subscribeToResponseOf('demo-topic')
      // this.client.subscribeToResponseOf('demo-topic.reply')
      await this.client.connect()
  }

  onModuleDestroy() {
      this.logger.debug('onModuleDestroy')
      this.client.close()
  }
}

