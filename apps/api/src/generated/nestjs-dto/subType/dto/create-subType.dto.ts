
import {ApiProperty} from '@nestjs/swagger'




export class CreateSubTypeDto {
  @ApiProperty({
  type: 'string',
})
name: string ;
}
