export interface Response<T> {
  code: number
  data: T
  msg: string
}

export interface FindAllData {
  list: List[]
  [property: string]: any
}

export interface EmployeeData {
  department?: Department
  departmentId?: number
  id: number
  isLeave?: boolean
  name?: string
  phone?: string
  remark?: string
}

export interface List {
  calcCash: number
  cash: number
  department: Department
  departmentId: number
  EmployeeAndAddType: EmployeeAndAddType[]
  EmployeeAndSubType: EmployeeAndSubType[]
  id: number
  isLeave: boolean
  name: string
  phone: string
  remark: string
  [property: string]: any
}

export interface EmployeeAndAddType {
  addType: AddType
  addTypeId: number
  createTime: string
  employeeId: number
  fee: number
  remark: string
  updateTime: string
  [property: string]: any
}

export interface AddType {
  name: string
  [property: string]: any
}

export interface EmployeeAndSubType {
  createTime: string
  employeeId: number
  fee: number
  remark: string
  subType: SubType
  subTypeId: number
  updateTime: string
  [property: string]: any
}

export interface SubType {
  name: string
  [property: string]: any
}

export interface Department {
  id: number
  name: string
  [property: string]: any
}

export interface Datum {
  id: number
  createTime?: string
  employees?: Employee[]
  name?: string
  [property: string]: any
}

export interface Employee {
  cash: number
  createTime: string
  departmentId: number
  id: number
  isLeave: boolean
  name: string
  phone: string
  remark: string
  updateTime: string
  [property: string]: any
}

export interface IAddDepartment {
  name: string
}

export interface IEditDepartment {
  id: number
  name: string
}

export interface IAddAdd {
  name: string
}

export interface IEditAdd {
  id: number
  name: string
}

export interface IAddSub {
  name: string
}

export interface IEditSub {
  id: number
  name: string
}

export interface IAddOption {
  addTypeId: number
  addTypeName: string
  fee: number
  remark: string
}

export interface ISubOption {
  subTypeId: number
  subTypeName: string
  fee: number
  remark: string
}

export type DialogMode = 'add' | 'edit'

export interface IEmployeeOption {
  name: string
  id: number
  departmentId: number
  department: {
    name: string
  }
}

export interface IAddCash {
  employeeAndAddType: IAddTypeWithCash[]
  employeeAndSubType: ISubTypeWithCash[]
}

export interface IUpdateCash extends IAddCash {
  employeeId: number
  startTime: string
  endTime: string
}

export interface IAddTypeWithCash {
  employeeId: number
  addTypeId: number
  addTypeName: string
  fee: number
  remark: string
}
export interface ISubTypeWithCash {
  employeeId: number
  subTypeId: number
  subTypeName: string
  fee: number
  remark: string
}

export interface IAddEmp {
  departmentId: number
  name: string
  phone: string
  remark: string
  [property: string]: any
}

export interface IEditEmp {
  departmentId: number
  id: number
  name: string
  phone: string
  remark: string
  [property: string]: any
}
