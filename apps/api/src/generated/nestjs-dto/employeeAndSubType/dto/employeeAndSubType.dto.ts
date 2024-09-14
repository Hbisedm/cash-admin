import { ApiProperty } from '@nestjs/swagger';

export class EmployeeAndSubTypeDto {
  @ApiProperty({
    type: 'number',
    format: 'float',
  })
  fee: number;
  @ApiProperty({
    type: 'string',
  })
  remark: string;
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
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
}
