
import {ApiProperty} from '@nestjs/swagger'




export class ConnectDepartmentDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
