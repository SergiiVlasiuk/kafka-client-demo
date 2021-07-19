import { SharedLoggerInterceptor } from '@app/shared';
import { Body, Controller, Get, UseInterceptors } from '@nestjs/common';

@Controller()
export class SecondAppController {

  @UseInterceptors(SharedLoggerInterceptor)
  @Get()
  getHello(@Body() body: number[]) {
    console.log(`[SecondAppController] - useless method but verifyes interceptor work`)
  }
}
