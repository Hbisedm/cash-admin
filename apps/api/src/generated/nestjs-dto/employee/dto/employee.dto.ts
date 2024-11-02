
import {ApiProperty} from '@nestjs/swagger'


export class EmployeeDto {
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
})
phone: string ;
@ApiProperty({
  type: 'boolean',
})
isLeave: boolean ;
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
}
