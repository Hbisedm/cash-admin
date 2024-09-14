import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAddTypeDto {
  @IsNotEmpty({ message: 'addTypeId 字段必填' })
  @ApiProperty()
  addTypeId: number;
  @IsNotEmpty({ message: 'employeeId 字段必填' })
  @ApiProperty()
  employeeId: number;
}
