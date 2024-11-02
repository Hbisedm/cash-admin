
import {ApiProperty} from '@nestjs/swagger'




export class ConnectEmployeeDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
