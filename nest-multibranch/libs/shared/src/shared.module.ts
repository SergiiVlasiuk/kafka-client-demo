import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport, ClientsModuleOptions, ClientProviderOptions } from '@nestjs/microservices';
import { ClientConfiguration } from './client.configuration';
import { SumClientService } from './sum-client.service';

@Module({})
export class SharedModule {
  // Array<ClientProviderOptions>
  static register(options: ClientProviderOptions): DynamicModule {
  // static register(options: Array<ClientProviderOptions>): DynamicModule {
  // static register(...options: Array<ClientProviderOptions>): DynamicModule {
  // static register(...options: ClientConfiguration[]): DynamicModule {
      return {
      module: SharedModule,
      // todo options
      imports: [ClientsModule.register(
        [ options ]
      )],
      providers: [
        { provide: 'CLIENT_NAMES', useFactory: () => [ options.name ] },
        // { provide: LoggerClientService, useClass: LoggerClientService },
        SumClientService,
      ],
      exports: [SumClientService]
    }
  }
}
