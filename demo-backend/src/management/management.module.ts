import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UserModule, SettingsModule, UsersModule]
})
export class ManagementModule {}
