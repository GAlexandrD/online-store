import { ApiProperty } from '@nestjs/swagger';

export class BasketParamsDto {
  @ApiProperty()
  userId: string;
}
