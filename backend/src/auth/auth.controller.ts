import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { AccessToken, UserDto } from '../interfaces';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: UserDto): Promise<AccessToken> {
    return this.authService.login(user);
  }
}
