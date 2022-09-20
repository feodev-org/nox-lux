import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
