import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { SecondAppController } from './second-app.controller';
import { Transport } from '@nestjs/microservices';

@Module({
  imports: [ SharedModule.register( { name: 'MATH_SERVICE', transport: Transport.TCP } )],
  controllers: [SecondAppController],
})
export class SecondAppModule {}
