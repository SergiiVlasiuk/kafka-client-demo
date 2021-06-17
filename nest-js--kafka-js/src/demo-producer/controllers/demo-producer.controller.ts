import { Controller, Get, Logger } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Observable } from 'rxjs';
import { DemoProducerService } from '../services';
import { kafkajsProducerConfig } from '../../configurations';

@Controller('demo-producer')
export class DemoProducerController {
    private readonly logger = new Logger(DemoProducerController.name);

    constructor(private demoProducerService: DemoProducerService) {
        this.logger.debug('created')
    }

    @Client(kafkajsProducerConfig)
    kafka: ClientKafka

    @Get()
    getProducerHello(): string {
        this.logger.verbose('getProducerHello')
        this.send()
        this.demoProducerService.traceMe()
        return 'hello producer'
    }

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // @Cron(CronExpression.EVERY_MINUTE)
    @Cron(CronExpression.EVERY_30_SECONDS)
    cronTrigger() {
        this.logger.verbose('cron trigger')
        this.send()
    }

    send() {
        const payload = 'hello from [DemoProducerController] ' + new Date()
        const sent: Observable<any> = this.kafka.emit('demo-topic', payload)
        // const sent: Observable<any> = this.kafka.send({ cmd: 'sum' }, payload)
        this.logger.verbose('message is published')
        // sent.subscribe(answer => console.log('message has been sent and answered: ', answer))
    }

}
