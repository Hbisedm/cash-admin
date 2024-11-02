
import {ApiProperty} from '@nestjs/swagger'
import {EmployeeAndAddType} from '../../employeeAndAddType/entities/employeeAndAddType.entity'


export class AddType {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
})
name: string ;
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
  type: () => EmployeeAndAddType,
  isArray: true,
  required: false,
})
EmployeeAndAddTypes?: EmployeeAndAddType[] ;
}
