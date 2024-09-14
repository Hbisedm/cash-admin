import { ApiProperty } from '@nestjs/swagger';
import { Department } from '../../department/entities/department.entity';
import { EmployeeAndAddType } from '../../employeeAndAddType/entities/employeeAndAddType.entity';
import { EmployeeAndSubType } from '../../employeeAndSubType/entities/employeeAndSubType.entity';

export class Employee {
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
  })
  phone: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  departmentId: number;
  @ApiProperty({
    type: 'boolean',
  })
  isLeave: boolean;
  @ApiProperty({
    type: 'string',
  })
  remark: string;
  @ApiProperty({
    type: () => Department,
    required: false,
  })
  department?: Department;
  @ApiProperty({
    type: () => EmployeeAndAddType,
    isArray: true,
    required: false,
  })
  EmployeeAndAddType?: EmployeeAndAddType[];
  @ApiProperty({
    type: () => EmployeeAndSubType,
    isArray: true,
    required: false,
  })
  EmployeeAndSubType?: EmployeeAndSubType[];
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
