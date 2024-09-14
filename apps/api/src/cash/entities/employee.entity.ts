import { ApiProperty } from '@nestjs/swagger';

export class Employee {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  departmentId: number;
  @ApiProperty()
  cash: number;
  @ApiProperty()
  remark: string;
}
