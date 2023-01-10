import { ApiProperty } from '@nestjs/swagger';

export class BasketDeviceQueryDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  deviceId: string;
}
