import { ApiProperty } from '@nestjs/swagger';
import { AddType } from '../../addType/entities/addType.entity';
import { Employee } from '../../employee/entities/employee.entity';

export class EmployeeAndAddType {
  @ApiProperty({
    type: () => AddType,
    required: false,
  })
  addType?: AddType;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  addTypeId: number;
  @ApiProperty({
    type: () => Employee,
    required: false,
  })
  employee?: Employee;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  employeeId: number;
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
