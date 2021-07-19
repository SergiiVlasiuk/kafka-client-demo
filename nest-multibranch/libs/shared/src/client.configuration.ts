import { Transport } from '@nestjs/microservices';

export interface ClientConfiguration {
    name: string;
    transport: Transport;
}
