import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkajsMicroserviceConfig } from './kafkajaMicroserviceConfig';

@Module({})
export class DemoKafkaModule implements OnModuleInit, OnModuleDestroy {

    @Client(kafkajsMicroserviceConfig)
    client: ClientKafka

    async onModuleInit() {
        console.log('[DemoKafkaModule] onModuleInit')
        this.client.subscribeToResponseOf('demo-topic')
        // this.client.subscribeToResponseOf('demo-topic.reply')
        await this.client.connect()
    }

    onModuleDestroy() {
        console.log('[DemoKafkaModule] onModuleDestroy')
        this.client.close()
    }
}
