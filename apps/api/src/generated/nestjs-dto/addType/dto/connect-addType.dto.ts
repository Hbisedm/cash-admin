
import {ApiProperty} from '@nestjs/swagger'




export class ConnectAddTypeDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
