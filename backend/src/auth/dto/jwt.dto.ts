import { IsJWT, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface JwtDto {
  /**
   * Subscriber
   */
  sub: string;
  /**
   * Issued at
   */
  iat: number;
  /**
   * Expiration time
   */
  exp: number;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
