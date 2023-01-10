import { ApiProperty } from '@nestjs/swagger';
type Role = 'USER' | 'ADMIN';

export class UserData {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: Role;
}

export class UserResponse {
  @ApiProperty({ type: UserData })
  user: UserData;
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}
