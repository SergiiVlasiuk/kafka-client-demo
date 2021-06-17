import { Controller, Get, Logger } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { DemoConsumerService } from '../services';

@Controller('demo-consumer')
export class DemoConsumerController {
    private readonly logger = new Logger(DemoConsumerController.name);

    constructor(private demoConsumerService: DemoConsumerService) {
        this.logger.debug('created')
    }

    @Get()
    getConsumerHello(): string {
        this.logger.verbose('getConsumerHello')
        this.demoConsumerService.traceMe()
        return 'hello consumer'
    }

    // @MessagePattern('demo-topic')
    @EventPattern('demo-topic')
    killDragon(@Payload() { value }, @Ctx() context: KafkaContext) {
        this.logger.verbose(`Message: ${value}`);
        this.logger.verbose(`Topic: ${context.getTopic()}`);
    }
}


// String userSchema = "{\"type\":\"record\"," +
//                     "\"name\":\"myrecord\"," +
//                     "\"fields\":[{\"name\":\"f1\",\"type\":\"string\"}]}";


const message = {
    "name": "any-name",
    "message": "message content"
}

const schema = {
    "fields": [
      {
        "name": "holder",
        "type": {
          "fields": [
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "message",
              "type": "string"
            }
          ],
          "name": "holder",
          "type": "record"
        }
      }
    ],
    "name": "Holder",
    "namespace": "examples",
    "type": "record"
  }


