import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { PasswordService } from '../password.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UsersService, PrismaService, PasswordService, ConfigService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
