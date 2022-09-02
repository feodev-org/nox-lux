import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Token } from './models/token.model';
import { SignupDto } from './dto/signup.dto';
import { RefreshTokenDto } from './dto/jwt.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '../users/models/user.model';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: any): Promise<Token> {
    const user: User = request.user;
    return this.authService.generateTokens({ sub: user.email });
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<Token> {
    signupDto.email = signupDto.email.toLowerCase();
    return await this.authService.createUser(signupDto);
  }

  @Post('token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<Token> {
    return await this.authService.refreshToken(refreshTokenDto.token);
  }
}
