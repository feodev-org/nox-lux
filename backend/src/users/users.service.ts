import { Injectable } from '@nestjs/common';
import { UserDto } from '../interfaces';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    {
      userId: 1,
      email: 'thomas@feodev.org',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'raphael@kueny.me',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<UserDto | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
