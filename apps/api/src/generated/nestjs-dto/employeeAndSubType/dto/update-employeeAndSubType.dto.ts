
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {CreateSubTypeDto} from '../../subType/dto/create-subType.dto'
import {ConnectSubTypeDto} from '../../subType/dto/connect-subType.dto'
import {CreateEmployeeDto} from '../../employee/dto/create-employee.dto'
import {ConnectEmployeeDto} from '../../employee/dto/connect-employee.dto'

export class UpdateEmployeeAndSubTypeSubTypeRelationInputDto {
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
export class UpdateEmployeeAndSubTypeEmployeeRelationInputDto {
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

@ApiExtraModels(CreateSubTypeDto,ConnectSubTypeDto,UpdateEmployeeAndSubTypeSubTypeRelationInputDto,CreateEmployeeDto,ConnectEmployeeDto,UpdateEmployeeAndSubTypeEmployeeRelationInputDto)
export class UpdateEmployeeAndSubTypeDto {
  @ApiProperty({
  required: false,
  type: UpdateEmployeeAndSubTypeSubTypeRelationInputDto,
})
subType?: UpdateEmployeeAndSubTypeSubTypeRelationInputDto ;
@ApiProperty({
  required: false,
  type: UpdateEmployeeAndSubTypeEmployeeRelationInputDto,
})
employee?: UpdateEmployeeAndSubTypeEmployeeRelationInputDto ;
@ApiProperty({
  type: 'number',
  format: 'float',
  required: false,
})
fee?: number ;
@ApiProperty({
  type: 'string',
  required: false,
})
remark?: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  required: false,
})
time?: Date ;
}
