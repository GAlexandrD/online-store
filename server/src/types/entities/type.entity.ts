import { ApiProperty } from '@nestjs/swagger';

export class Type {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
