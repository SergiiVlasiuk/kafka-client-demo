import { Body, Controller, Get, HttpException, Logger, Post } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DemoProducerService } from '../services';
import { kafkajsProducerConfig, schema } from '../../configurations';

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
        return 'hello producer'
    }

    @Post()
    async sendMessage(@Body() message) {
        this.logger.verbose(`sending message: ${JSON.stringify(message)}`)
        return this.send(message)
            .then(() => 'sent')
            .catch(error => {
                const response = {
                    error: {
                        message: error?.message,
                        paths: error?.paths,
                        usedSchema: schema,
                        correctMessage: JSON.stringify(defaultMessage),
                    }
                }
                this.logger.error(`incorrect message: ${error.message}`)
                throw new HttpException(response, 422)
            })
    }

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // @Cron(CronExpression.EVERY_MINUTE)
    @Cron(CronExpression.EVERY_5_MINUTES)
    // @Cron(CronExpression.EVERY_30_SECONDS)
    cronTrigger() {
        this.logger.verbose('cron trigger')
        this.send({
            firstLevelField: {
                name: defaultMessage.firstLevelField.name,
                description: new Date().toDateString()
            }
        })
    }

    send(payload = defaultMessage) {
        // const payload = 'hello from [DemoProducerController] ' + new Date()
        // const sent: Observable<any> = this.kafka.emit('demo-topic', payload)
        // const sent: Observable<any> = this.kafka.send({ cmd: 'sum' }, payload)
        return this.demoProducerService.sendMessage(payload)
        // sent.subscribe(answer => console.log('message has been sent and answered: ', answer))
    }

}

const defaultMessage = {
    firstLevelField: {
        name: 'Subhash Chandra Bose',
        description: 'indian hero',
    }
}
