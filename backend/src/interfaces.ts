import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MongoQueryFilters {
  @IsOptional()
  @IsNumber()
  offset = 0;

  @IsOptional()
  @IsNumber()
  limit = 10;
}

export class MongoCount {
  count: number;
}

export class UserDto {
  userId: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class AccessToken {
  @ApiProperty()
  access_token: string;
}
