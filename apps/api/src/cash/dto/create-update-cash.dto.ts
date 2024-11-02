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
    time: Date
  }[];

  employeeAndSubType: {
    id?: number;
    fee: number;
    remark: string;
    subTypeId: number;
    employeeId: number;
    time: Date
  }[];
}
