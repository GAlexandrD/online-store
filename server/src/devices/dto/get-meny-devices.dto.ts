import { ApiProperty } from '@nestjs/swagger';
import { DeviceEntity } from '../entities/device.entity';

export class GetManyDevicesDto {
  @ApiProperty()
  count: number;
  @ApiProperty({ type: DeviceEntity, isArray: true })
  rows: DeviceEntity[];
}
