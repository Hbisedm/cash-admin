import { PartialType } from '@nestjs/mapped-types';
import { Cash } from '../entities/cash.entity';

export class UpdateCashDto extends PartialType(Cash) {}
