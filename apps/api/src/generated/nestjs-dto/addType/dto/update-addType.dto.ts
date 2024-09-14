import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddTypeDto {
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
}
