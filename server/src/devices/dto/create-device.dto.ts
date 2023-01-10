import { ApiProperty } from '@nestjs/swagger';

class DeviceInfo {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
}

export class CreateDeviceDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  type: string;

  @ApiProperty({ isArray: true, required: false, type: DeviceInfo })
  device_infos?: DeviceInfo[];
}
