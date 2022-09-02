import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, UserProfile } from './models/user.model';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PasswordService } from '../password.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { prismaUserProfileIncludeQuery } from '../interfaces';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async findUser(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { email },
      include: prismaUserProfileIncludeQuery,
    });
  }

  async updateUser(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserProfile> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return await this.prisma.userProfile.upsert({
      update: updateUserDto,
      create: { userId: user.id, ...updateUserDto },
      where: {
        userId: user.id,
      },
    });
  }

  async changePassword(
    email: string,
    currentPassword: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    const passwordValid = await this.passwordService.validatePassword(
      changePasswordDto.oldPassword,
      currentPassword,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePasswordDto.newPassword,
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { email },
      include: prismaUserProfileIncludeQuery,
    });
  }
}
