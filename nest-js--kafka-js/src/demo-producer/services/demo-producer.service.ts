import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DemoProducerService {
    private readonly logger = new Logger(DemoProducerService.name);

    constructor() {
        this.logger.debug('created')
    }

    public traceMe() {
        this.logger.verbose('trace me')
    }

}
