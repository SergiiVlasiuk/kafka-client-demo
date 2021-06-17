import { Inject, Injectable, Logger } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkajsProducerConfig } from '../../configurations';

@Injectable()
export class DemoProducerService {
    private readonly logger = new Logger(DemoProducerService.name);

    constructor(@Inject('REGISTRY') private registryProvider) {
        this.logger.debug('created')
    }

    @Client(kafkajsProducerConfig)
    kafkaClient: ClientKafka

    async sendMessage(payloaad) {
        // const payload = 'hello from [DemoProducerController] ' + new Date()
        // const sent: Observable<any> = this.kafka.emit('demo-topic', payload)
        // const sent: Observable<any> = this.kafka.send({ cmd: 'sum' }, payload)
        // sent.subscribe(answer => console.log('message has been sent and answered: ', answer))

        this.kafkaClient.emit(
            'demo-topic',
            await this.registryProvider.encode(payloaad)
        )
    }

    public traceMe() {
        this.logger.verbose('trace me')
    }

}
