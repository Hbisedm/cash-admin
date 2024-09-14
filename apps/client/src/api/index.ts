import type { Datum, EmployeeData, FindAllData, IAddAdd, IAddCash, IAddDepartment, IAddEmp, IAddSub, IEditAdd, IEditDepartment, IEditEmp, IEmployeeOption, IUpdateCash, Response } from './type'
import request from '~/utils/request'

export function exception() {
  return request.get<any>({
    url: '/cash/exception',
  })
}

export function findAllEmployee() {
  return request.get<Response<EmployeeData[]>>({
    url: '/cash/employee',
  })
}

/** 所有存在工资的员工(按月) */
export function findAllNoExistCash(params: {
  startTime: string
  endTime: string
}) {
  return request.get<Response<EmployeeData[]>>({
    url: '/cash/employee/noExistCash',
    data: params,
  })
}

/** 所有人的工资 */
export function findAllCash(params: {
  name: string | ''
  startTime: string
  endTime: string
}) {
  return request.get<Response<FindAllData>>({
    url: '/cash',
    data: params,
  })
}

/** 查看员工每个月的工资 */
export function findDetail(params: {
  id: number
  startTime: string
  endTime: string
}) {
  return request.get<Response<FindAllData>>({
    url: '/cash/detail',
    data: params,
  })
}

/** 获取所有人员选项 */
export function employeeOptions() {
  return request.get<Response<IEmployeeOption[]>>({
    url: '/cash/employee/options',
  })
}

export function addEmployee(data: IAddEmp) {
  return request.post<Response<boolean>>({
    url: '/cash/employee',
    data,
  })
}

export function editEmployee(data: IEditEmp) {
  return request.put<Response<boolean>>({
    url: '/cash/employee',
    data,
  })
}

export function deleteEmployee(id: number) {
  return request.delete<Response<boolean>>({
    url: `/cash/employee/${id}`,
  })
}

export function findDepartment() {
  return request.get<Response<Datum[]>>({
    url: '/cash/department',
  })
}

export function addDepartment(data: IAddDepartment) {
  return request.post<Response<any>>({
    url: '/cash/department',
    data,
  })
}

export function editDepartment(data: IEditDepartment) {
  return request.put<Response<any>>({
    url: '/cash/department',
    data,
  })
}

export function removeDepartment(id: number) {
  return request.delete<Response<any>>({
    url: `/cash/department/${id}`,
  })
}

// #region add

export function findAdd() {
  return request.get<Response<Datum[]>>({
    url: '/cash/add',
  })
}

export function addAdd(data: IAddAdd) {
  return request.post<Response<any>>({
    url: '/cash/add',
    data,
  })
}

export function editAdd(data: IEditAdd) {
  return request.put<Response<any>>({
    url: '/cash/add',
    data,
  })
}

export function removeAdd(id: number) {
  return request.delete<Response<any>>({
    url: `/cash/add/${id}`,
  })
}

// #endregion

// #region sub

export function findSub() {
  return request.get<Response<Datum[]>>({
    url: '/cash/sub',
  })
}

export function addSub(data: IAddSub) {
  return request.post<Response<any>>({
    url: '/cash/sub',
    data,
  })
}

export function editSub(data: IEditAdd) {
  return request.put<Response<any>>({
    url: '/cash/sub',
    data,
  })
}

export function removeSub(id: number) {
  return request.delete<Response<any>>({
    url: `/cash/sub/${id}`,
  })
}

// #endregion

// #region cash
export function addCash(data: IAddCash) {
  return request.post<Response<any>>({
    url: '/cash/cash',
    data,
  })
}

export function updateCash(data: IUpdateCash) {
  return request.put<Response<any>>({
    url: '/cash/cash',
    data,
  })
}
// #endregion
