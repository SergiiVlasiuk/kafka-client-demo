import { Controller, Get, Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('management/user')
export class UserController {
  logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {
    this.logger.verbose('created');
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }
}
