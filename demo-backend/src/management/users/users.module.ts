import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { SharedModule } from '../../shared';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
})
export class UsersModule {}
