import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @MaxLength(255)
  @IsOptional()
  firstName?: string;

  @ApiProperty({ required: false })
  @MaxLength(255)
  @IsOptional()
  lastName?: string;
}
