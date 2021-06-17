import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DemoConsumerService {
    private readonly logger = new Logger(DemoConsumerService.name);

    constructor() {
        this.logger.debug('created')
    }

    public traceMe() {
        this.logger.verbose('trace me')
    }
}
