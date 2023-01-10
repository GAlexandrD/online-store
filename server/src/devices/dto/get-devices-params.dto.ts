import { ApiProperty } from '@nestjs/swagger';

export class GetDevicesParams {
  @ApiProperty({ required: false })
  brandId: string;
  @ApiProperty({ required: false })
  typeId: string;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: true })
  page: string;
  @ApiProperty({ required: true })
  limit: string;
}
