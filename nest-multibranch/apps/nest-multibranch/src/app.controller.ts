import { SharedLoggerInterceptor } from '@app/shared';
import { Body, Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  // @UseInterceptors(SharedLoggerInterceptor)
  @Get()
  getHello(@Body() body: number[]): Observable<number> {
    return this.client.send<number>({ cmd: 'sum' }, body);
  }

  // @UseInterceptors(SharedLoggerInterceptor)
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
