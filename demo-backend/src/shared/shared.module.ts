import { Module } from '@nestjs/common';
import { CollectInfoService, UsersService } from './services';

@Module({
  providers: [CollectInfoService, UsersService],
  exports: [CollectInfoService, UsersService],
})
export class SharedModule {}
