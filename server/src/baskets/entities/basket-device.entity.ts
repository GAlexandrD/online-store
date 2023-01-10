import { ApiProperty } from '@nestjs/swagger';

export class BasketDeviceEntity {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  deviceId: number;
}
