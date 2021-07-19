import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MicroserviceSubscriberController {

  @MessagePattern({ cmd: 'sum' })
  async accumulate(values: number[]): Promise<number> {
    console.log('Receive message from publisher!');
    return (values ?? []).reduce((acc, curr) => acc + curr);
  }
}
