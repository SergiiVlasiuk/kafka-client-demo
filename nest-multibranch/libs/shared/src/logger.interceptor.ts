import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { SumClientService } from './sum-client.service';

@Injectable()
export class SharedLoggerInterceptor implements NestInterceptor {
  constructor(private readonly clientService: SumClientService) {
    console.log('[SharedLoggerInterceptor] - created')
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('[SharedLoggerInterceptor]')
    console.time('[SharedLoggerInterceptor]')
    const body = context.switchToHttp().getRequest().body;
    return next.handle().pipe(
      tap(data => console.log(`[SharedLoggerInterceptor] `, data)),
      tap(() => console.timeEnd(`[SharedLoggerInterceptor]`)),
      mergeMap(() => this.clientService.sumCalculation(body)),
      // catchError(() => this.clientService.sumCalculation(body))
    );
  }
}
