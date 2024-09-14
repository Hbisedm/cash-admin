import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../employee/entities/employee.entity';

export class Department {
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
    type: () => Employee,
    isArray: true,
    required: false,
  })
  employees?: Employee[];
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
