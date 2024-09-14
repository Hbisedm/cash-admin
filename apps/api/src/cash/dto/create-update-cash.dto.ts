export class CreateUpdateCashDto {
  employeeId?: number;

  startTime?: string;
  endTime?: string;

  employeeAndAddType: {
    id?: number;
    fee: number;
    remark: string;
    addTypeId: number;
    employeeId: number;
  }[];

  employeeAndSubType: {
    id?: number;
    fee: number;
    remark: string;
    subTypeId: number;
    employeeId: number;
  }[];
}
