import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  profile: UserProfile;
}

export class UserProfile {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

export class UserPublic {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;
}
