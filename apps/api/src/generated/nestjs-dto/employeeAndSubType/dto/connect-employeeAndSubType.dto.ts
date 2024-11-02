
import {ApiProperty} from '@nestjs/swagger'




export class ConnectEmployeeAndSubTypeDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
