import { Employee } from 'src/generated/nestjs-dto/employee/entities/employee.entity';

export class EmployeeVo extends Employee {
  time: Date
  addCash: string;
  calcCash: string;
}
