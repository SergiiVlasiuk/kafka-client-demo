import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../shared';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    this.logger.debug(`username: ${username}`);
    const user = await this.usersService.findByUserName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
