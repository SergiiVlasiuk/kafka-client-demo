import { Controller, Get, Logger, UseInterceptors } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { Log } from 'src/log.decorator';
import { LogInterceptor } from 'src/log.interceptor';
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
  @Log('log-decorator')
  @UseInterceptors(LogInterceptor)
  @EventPattern('demo-topic')
  async killDragon(
    @Payload() { value },
    @Ctx() context: KafkaContext,
  ) {
    this.logger.debug(`payload: ${await this.demoConsumerService.getDecodedValue(value)}`)
    this.logger.verbose(`Topic: ${context.getTopic()}`);
  }
}
