import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  logger = new Logger(LogInterceptor.name);

  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.debug('start intercepting')
    const logDecoratorKey = this.reflector.get('log', context.getHandler())
    this.logger.debug(`logDecoratorKey: ${logDecoratorKey}`)
    return next.handle().pipe(
      tap(() => this.logger.debug('end  intercepting'))
    );
  }
}
