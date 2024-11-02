
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {CreateSubTypeDto} from '../../subType/dto/create-subType.dto'
import {ConnectSubTypeDto} from '../../subType/dto/connect-subType.dto'
import {CreateEmployeeDto} from '../../employee/dto/create-employee.dto'
import {ConnectEmployeeDto} from '../../employee/dto/connect-employee.dto'

export class CreateEmployeeAndSubTypeSubTypeRelationInputDto {
    @ApiProperty({
  required: false,
  nullable: true,
  type: CreateSubTypeDto,
})
create?: CreateSubTypeDto ;
@ApiProperty({
  required: false,
  nullable: true,
  type: ConnectSubTypeDto,
})
connect?: ConnectSubTypeDto ;
  }
export class CreateEmployeeAndSubTypeEmployeeRelationInputDto {
    @ApiProperty({
  required: false,
  nullable: true,
  type: CreateEmployeeDto,
})
create?: CreateEmployeeDto ;
@ApiProperty({
  required: false,
  nullable: true,
  type: ConnectEmployeeDto,
})
connect?: ConnectEmployeeDto ;
  }

@ApiExtraModels(CreateSubTypeDto,ConnectSubTypeDto,CreateEmployeeAndSubTypeSubTypeRelationInputDto,CreateEmployeeDto,ConnectEmployeeDto,CreateEmployeeAndSubTypeEmployeeRelationInputDto)
export class CreateEmployeeAndSubTypeDto {
  @ApiProperty({
  type: CreateEmployeeAndSubTypeSubTypeRelationInputDto,
})
subType: CreateEmployeeAndSubTypeSubTypeRelationInputDto ;
@ApiProperty({
  type: CreateEmployeeAndSubTypeEmployeeRelationInputDto,
})
employee: CreateEmployeeAndSubTypeEmployeeRelationInputDto ;
@ApiProperty({
  type: 'number',
  format: 'float',
})
fee: number ;
@ApiProperty({
  type: 'string',
  required: false,
})
remark?: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
time: Date ;
}
