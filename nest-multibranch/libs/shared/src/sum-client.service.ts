import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class SumClientService {
    constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {
        console.log('[SumClientService] - created')
    }

    sumCalculation(row: number[]): Observable<number> {
        return this.client.send<number>({ cmd: 'sum' }, row);
    }
}
