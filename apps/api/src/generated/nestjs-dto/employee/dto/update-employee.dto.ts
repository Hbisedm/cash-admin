import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { CreateDepartmentDto } from '../../department/dto/create-department.dto';
import { ConnectDepartmentDto } from '../../department/dto/connect-department.dto';

export class UpdateEmployeeDepartmentRelationInputDto {
  @ApiProperty({
    required: false,
    nullable: true,
    type: CreateDepartmentDto,
  })
  create?: CreateDepartmentDto;
  @ApiProperty({
    required: false,
    nullable: true,
    type: ConnectDepartmentDto,
  })
  connect?: ConnectDepartmentDto;
}

@ApiExtraModels(
  CreateDepartmentDto,
  ConnectDepartmentDto,
  UpdateEmployeeDepartmentRelationInputDto,
)
export class UpdateEmployeeDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    default: 'autoincrement',
    required: false,
  })
  id?: number;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  name?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  phone?: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  remark?: string;
  @ApiProperty({
    required: false,
    type: UpdateEmployeeDepartmentRelationInputDto,
  })
  department?: UpdateEmployeeDepartmentRelationInputDto;
}
