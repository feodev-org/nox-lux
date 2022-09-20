import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Token } from './models/token.model';
import { PasswordService } from '../password.service';
import { SignupDto } from './dto/signup.dto';
import { User } from '../users/models/user.model';
import { JwtDto } from './dto/jwt.dto';
import { prismaUserProfileIncludeQuery } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private configService: ConfigService,
    private passwordService: PasswordService,
  ) {}

  async createUser(signupDto: SignupDto): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      signupDto.password,
    );

    try {
      const user = await this.prismaService.user.create({
        data: {
          ...signupDto,
          password: hashedPassword,
          role: 'USER',
        },
      });

      return this.generateTokens({
        sub: user.email,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${signupDto.email} already used.`);
      } else {
        throw new Error(e);
      }
    }
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['sub'];
    return this.prismaService.user.findUnique({
      where: { id },
      include: prismaUserProfileIncludeQuery,
    });
  }

  async validateUser(email: string): Promise<User> {
    return await this.usersService.findUser(email);
  }

  async generateTokens(payload: { sub: string }): Promise<Token> {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { sub: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { sub: string }): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRY'),
    });
  }

  async refreshToken(token: string) {
    try {
      const { sub } = this.jwtService.verify<JwtDto>(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        sub,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
