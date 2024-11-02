
import {ApiProperty} from '@nestjs/swagger'




export class CreateDepartmentDto {
  @ApiProperty({
  type: 'string',
})
name: string ;
}
