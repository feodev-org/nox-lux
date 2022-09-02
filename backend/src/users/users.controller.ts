import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User, UserProfile, UserPublic } from './models/user.model';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsNotEmpty } from 'class-validator';
import { toUserPublic } from './users.helpers';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req): Promise<UserPublic> {
    return toUserPublic(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('update')
  async update(
    @Req() req: any,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserPublic> {
    const user: User = req.user;
    return this.usersService.updateUser(user, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Req() req: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<UserPublic> {
    const user: User = req.user;
    return await this.usersService.changePassword(
      user.email,
      user.password,
      changePasswordDto,
    );
  }
}
