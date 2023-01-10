import { ApiProperty } from '@nestjs/swagger';
import { brands, types, device_infos } from '@prisma/client';

class DeviceInfo implements device_infos {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  deviceId: number;
}

class Brand implements brands {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

class Type implements types {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

export class DeviceEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ type: Brand })
  brands: brands;

  @ApiProperty({ type: Type })
  types: types;

  @ApiProperty({ isArray: true, required: false, type: DeviceInfo })
  device_infos?: device_infos[];

  @ApiProperty({ required: false })
  img?: string;
}
