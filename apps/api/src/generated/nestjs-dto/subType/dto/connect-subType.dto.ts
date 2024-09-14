import { ApiProperty } from '@nestjs/swagger';

export class ConnectSubTypeDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
}
