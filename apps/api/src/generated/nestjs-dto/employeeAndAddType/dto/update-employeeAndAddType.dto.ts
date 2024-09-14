import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { CreateAddTypeDto } from '../../addType/dto/create-addType.dto';
import { ConnectAddTypeDto } from '../../addType/dto/connect-addType.dto';
import { CreateEmployeeDto } from '../../employee/dto/create-employee.dto';
import { ConnectEmployeeDto } from '../../employee/dto/connect-employee.dto';

export class UpdateEmployeeAndAddTypeAddTypeRelationInputDto {
  @ApiProperty({
    required: false,
    nullable: true,
    type: CreateAddTypeDto,
  })
  create?: CreateAddTypeDto;
  @ApiProperty({
    required: false,
    nullable: true,
    type: ConnectAddTypeDto,
  })
  connect?: ConnectAddTypeDto;
}
export class UpdateEmployeeAndAddTypeEmployeeRelationInputDto {
  @ApiProperty({
    required: false,
    nullable: true,
    type: CreateEmployeeDto,
  })
  create?: CreateEmployeeDto;
  @ApiProperty({
    required: false,
    nullable: true,
    type: ConnectEmployeeDto,
  })
  connect?: ConnectEmployeeDto;
}

@ApiExtraModels(
  CreateAddTypeDto,
  ConnectAddTypeDto,
  UpdateEmployeeAndAddTypeAddTypeRelationInputDto,
  CreateEmployeeDto,
  ConnectEmployeeDto,
  UpdateEmployeeAndAddTypeEmployeeRelationInputDto,
)
export class UpdateEmployeeAndAddTypeDto {
  @ApiProperty({
    required: false,
    type: UpdateEmployeeAndAddTypeAddTypeRelationInputDto,
  })
  addType?: UpdateEmployeeAndAddTypeAddTypeRelationInputDto;
  @ApiProperty({
    required: false,
    type: UpdateEmployeeAndAddTypeEmployeeRelationInputDto,
  })
  employee?: UpdateEmployeeAndAddTypeEmployeeRelationInputDto;
  @ApiProperty({
    type: 'number',
    format: 'float',
    required: false,
  })
  fee?: number;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  remark?: string;
}
