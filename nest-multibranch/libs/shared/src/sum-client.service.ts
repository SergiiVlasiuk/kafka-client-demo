import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class SumClientService {
    constructor(
        @Inject('MATH_SERVICE') private client: ClientProxy, // TODO should be removed
        @Inject('CLIENT_NAME') private name: string,
        ) {
        console.log('[SumClientService] - created')
    }

    // clientProxy: (clientName: string) => ClientProxy = (clientName: string): ClientProxy => // TODO load by clientName real client from nest.js context

    sumCalculation(row: number[]): Observable<number> {
        return this.client.send<number>({ cmd: 'sum' }, row);
    }
}
