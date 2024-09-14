import { ApiProperty } from '@nestjs/swagger';

export class CreateAddTypeDto {
  @ApiProperty({
    type: 'string',
  })
  name: string;
}
