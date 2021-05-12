import { Controller, Get } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { kafkajsProducerConfig } from './kafkajaProducerConfig';

@Controller('demo-producer')
export class DemoProducerController {

    @Client(kafkajsProducerConfig)
    kafka: ClientKafka

    @Get()
    getProducerHello(): string {
        console.log('[DemoProducerController] getProducerHello')
        this.send()

        return 'hello producer'
    }

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // @Cron(CronExpression.EVERY_MINUTE)
    @Cron(CronExpression.EVERY_30_SECONDS)
    cronTrigger() {
        console.log('[DemoProducerController] cron trigger')
        this.send()
    }

    send() {
        const payload = 'hello from [DemoProducerController] ' + new Date()
        const sent = this.kafka.emit('demo-topic', payload)
        console.log('[DemoProducerController] message is published')
        // sent.subscribe(() => console.log('message has been sent'))
    }

}
