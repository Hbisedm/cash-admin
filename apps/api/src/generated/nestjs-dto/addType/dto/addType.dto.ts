import { ApiProperty } from '@nestjs/swagger';

export class AddTypeDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createTime: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updateTime: Date;
}
