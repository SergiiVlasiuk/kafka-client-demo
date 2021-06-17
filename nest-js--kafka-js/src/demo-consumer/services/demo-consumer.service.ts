import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DemoConsumerService {
    private readonly logger = new Logger(DemoConsumerService.name);

    constructor(@Inject('REGISTRY') private registryProvider) {
        this.logger.debug('created')
    }

    public traceMe() {
        this.logger.verbose('trace me')
    }

    getDecodedValue(value) {
        const result = this.registryProvider.registry.decode(Buffer.from(value))
        // const result = this.registryProvider.decode(Buffer.from(value))
        this.logger.debug(`value: ${result}`)
        return result
    }
}
