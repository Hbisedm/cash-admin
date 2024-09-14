import { ApiProperty } from '@nestjs/swagger';
import { EmployeeAndSubType } from '../../employeeAndSubType/entities/employeeAndSubType.entity';

export class SubType {
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
    type: () => EmployeeAndSubType,
    isArray: true,
    required: false,
  })
  EmployeeAndSubTypes?: EmployeeAndSubType[];
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
