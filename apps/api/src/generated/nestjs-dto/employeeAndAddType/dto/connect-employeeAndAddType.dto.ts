
import {ApiProperty} from '@nestjs/swagger'




export class ConnectEmployeeAndAddTypeDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
