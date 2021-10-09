import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  // @Post('login')
  // async login(@Request() req) {
  //   // return req.admin;
  //   // return this.authService.validateUser(req.user.login, req.user.password);
  //   return req.user;
  // }
  // // async login(): Promise<string> {
  // //   return 'hello';
  // // }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    // return this.authService.login(req.user);
    return req.user;
  }
}
