import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';

@Controller('demo-consumer')
export class DemoConsumerController {

    @Get()
    getConsumerHello(): string {
        console.log('[DemoConsumerController] getConsumerHello')
        return 'hello consumer'
    }

    // @MessagePattern('demo-topic')
    @EventPattern('demo-topic')
    killDragon(@Payload() { value }, @Ctx() context: KafkaContext) {
        console.log(`[DemoConsumerController] Message: ${value}`);
        console.log(`[DemoConsumerController] Topic: ${context.getTopic()}`);
    }
}
