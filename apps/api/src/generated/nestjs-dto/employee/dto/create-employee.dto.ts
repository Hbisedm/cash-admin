
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {CreateDepartmentDto} from '../../department/dto/create-department.dto'
import {ConnectDepartmentDto} from '../../department/dto/connect-department.dto'

export class CreateEmployeeDepartmentRelationInputDto {
    @ApiProperty({
  required: false,
  nullable: true,
  type: CreateDepartmentDto,
})
create?: CreateDepartmentDto ;
@ApiProperty({
  required: false,
  nullable: true,
  type: ConnectDepartmentDto,
})
connect?: ConnectDepartmentDto ;
  }

@ApiExtraModels(CreateDepartmentDto,ConnectDepartmentDto,CreateEmployeeDepartmentRelationInputDto)
export class CreateEmployeeDto {
  @ApiProperty({
  type: 'string',
})
name: string ;
@ApiProperty({
  type: 'string',
})
phone: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
remark?: string ;
@ApiProperty({
  type: CreateEmployeeDepartmentRelationInputDto,
})
department: CreateEmployeeDepartmentRelationInputDto ;
}
