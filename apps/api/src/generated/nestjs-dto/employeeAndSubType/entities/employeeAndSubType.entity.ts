
import {ApiProperty} from '@nestjs/swagger'
import {SubType} from '../../subType/entities/subType.entity'
import {Employee} from '../../employee/entities/employee.entity'


export class EmployeeAndSubType {
  @ApiProperty({
  type: () => SubType,
  required: false,
})
subType?: SubType ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
subTypeId: number ;
@ApiProperty({
  type: () => Employee,
  required: false,
})
employee?: Employee ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
employeeId: number ;
@ApiProperty({
  type: 'number',
  format: 'float',
})
fee: number ;
@ApiProperty({
  type: 'string',
})
remark: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createTime: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updateTime: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
time: Date ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
