import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { CreateAddTypeDto } from '../../addType/dto/create-addType.dto';
import { ConnectAddTypeDto } from '../../addType/dto/connect-addType.dto';
import { CreateEmployeeDto } from '../../employee/dto/create-employee.dto';
import { ConnectEmployeeDto } from '../../employee/dto/connect-employee.dto';

export class CreateEmployeeAndAddTypeAddTypeRelationInputDto {
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
export class CreateEmployeeAndAddTypeEmployeeRelationInputDto {
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
  CreateEmployeeAndAddTypeAddTypeRelationInputDto,
  CreateEmployeeDto,
  ConnectEmployeeDto,
  CreateEmployeeAndAddTypeEmployeeRelationInputDto,
)
export class CreateEmployeeAndAddTypeDto {
  @ApiProperty({
    type: CreateEmployeeAndAddTypeAddTypeRelationInputDto,
  })
  addType: CreateEmployeeAndAddTypeAddTypeRelationInputDto;
  @ApiProperty({
    type: CreateEmployeeAndAddTypeEmployeeRelationInputDto,
  })
  employee: CreateEmployeeAndAddTypeEmployeeRelationInputDto;
  @ApiProperty({
    type: 'number',
    format: 'float',
  })
  fee: number;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  remark?: string;
}
