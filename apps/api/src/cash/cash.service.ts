import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployee } from './dto/create-employee.dto';
import { CreateDepartmentDto } from 'src/generated/nestjs-dto/department/dto/create-department.dto';
import { CreateEmployeeAndSubTypeDto } from 'src/generated/nestjs-dto/employeeAndSubType/dto/create-employeeAndSubType.dto';
import { CreateEmployeeAndAddTypeDto } from 'src/generated/nestjs-dto/employeeAndAddType/dto/create-employeeAndAddType.dto';
import { CreateAddTypeDto } from 'src/generated/nestjs-dto/addType/dto/create-addType.dto';
import { CreateSubTypeDto } from 'src/generated/nestjs-dto/subType/dto/create-subType.dto';
import { add, subtract } from 'mathjs';
import { EmployeeVo } from './vo/employee.vo';
import { UpdateDepartmentDto } from 'src/generated/nestjs-dto/department/dto/update-department.dto';
import { UpdateAddTypeDto } from 'src/generated/nestjs-dto/addType/dto/update-addType.dto';
import { UpdateSubTypeDto } from 'src/generated/nestjs-dto/subType/dto/update-subType.dto';
import { utils, write } from 'xlsx';
import { CreateUpdateCashDto } from './dto/create-update-cash.dto';
import { UpdateCashEmployeeVo } from './vo/update-cash-employee.vo';
import { UpdateEmployee } from './dto/update-employee.dto';

@Injectable()
export class CashService {
  @Inject(PrismaService)
  private prisma: PrismaService;

  async initType() {
    const createAdd = this.prisma.addType.createMany({
      data: [
        {
          name: '基本工资',
        },
        {
          name: '年资',
        },
        {
          name: '加班工资',
        },
        {
          name: '全勤',
        },
        {
          name: '职务补贴',
        },
      ],
    });

    const createSub = this.prisma.subType.createMany({
      data: [
        {
          name: '请假',
        },
        {
          name: '社保',
        },
        {
          name: '迟到早退',
        },
        {
          name: '罚款',
        },
      ],
    });

    await this.prisma.$transaction([createAdd, createSub]);
  }

  async init() {
    this.initType();
    const zw = await this.prisma.department.create({
      data: {
        name: '总务部',
      },
    });

    const employee = await this.prisma.employee.create({
      data: {
        remark: '',
        name: '小张',
        phone: '1388888888',
        department: {
          connect: {
            id: zw.id,
          },
        },
      },
    });

    await this.prisma.employeeAndAddType.createMany({
      data: [
        {
          fee: 500,
          remark: '',
          addTypeId: 1,
          employeeId: employee.id,
          time: new Date(),
        },
        {
          fee: 500,
          remark: '',
          addTypeId: 2,
          employeeId: employee.id,
          time: new Date(),
        },
        {
          fee: 500,
          remark: '',
          addTypeId: 3,
          employeeId: employee.id,
          time: new Date(),
        },
        {
          fee: 500,
          remark: '',
          addTypeId: 4,
          employeeId: employee.id,
          time: new Date(),
        },
        {
          fee: 500,
          remark: '',
          addTypeId: 5,
          employeeId: employee.id,
          time: new Date(),
        },
        {
          fee: 500,
          remark: '',
          addTypeId: 6,
          employeeId: employee.id,
          time: new Date(),
        },
      ],
    });

    await this.prisma.employeeAndSubType.createMany({
      data: [
        {
          fee: 500,
          remark: '',
          subTypeId: 1,
          employeeId: employee.id,
          time: new Date(),
        },
        {
          fee: 500,
          remark: '',
          subTypeId: 2,
          employeeId: employee.id,
          time: new Date(),
        },
        {
          fee: 500,
          remark: '',
          subTypeId: 3,
          employeeId: employee.id,
          time: new Date(),
        },
        {
          fee: 500,
          remark: '',
          subTypeId: 4,
          employeeId: employee.id,
          time: new Date(),
        },
      ],
    });

    return 'ok';
  }

  //#region department

  async findAllDepartment() {
    return await this.prisma.department.findMany({
      select: {
        id: true,
        name: true,
        createTime: true,
        employees: {
          where: {
            isLeave: false,
          },
        },
      },
    });
  }

  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    const addDepartment = this.prisma.department.create({
      data: {
        name: createDepartmentDto.name,
      },
    });
    return await this.prisma.$transaction([addDepartment]);
  }

  async editDepartment(updateDepartmentDto: UpdateDepartmentDto) {
    const updateDepartment = this.prisma.department.update({
      data: {
        name: updateDepartmentDto.name,
      },
      where: {
        id: updateDepartmentDto.id,
      },
    });
    return await this.prisma.$transaction([updateDepartment]);
  }

  async removeDepartment(id: number) {
    const employee = await this.prisma.employee.findMany({
      select: {
        id: true,
      },
      where: {
        departmentId: id,
      },
    });
    if (employee.length) {
      throw new HttpException(
        '当前部门含有员工, 不可删除',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.department.delete({
      where: {
        id,
      },
    });
    return 'ok';
  }

  //#endregion

  //#region add

  async createAdd(createAddTypeDto: CreateAddTypeDto) {
    const hasCount = await this.prisma.addType.count({
      where: {
        name: createAddTypeDto.name,
      },
    });

    if (hasCount > 0) {
      throw new HttpException(
        '已存在相同名称, 不可重复添加',
        HttpStatus.BAD_REQUEST,
      );
    }

    const add = await this.prisma.addType.create({
      data: {
        name: createAddTypeDto.name,
      },
    });
    return add;
  }

  async listAdd() {
    const list = await this.prisma.addType.findMany();
    return list;
  }

  async updateAdd(updateAddTypeDto: UpdateAddTypeDto) {
    const update = await this.prisma.addType.update({
      data: {
        name: updateAddTypeDto.name,
      },
      where: {
        id: updateAddTypeDto.id,
      },
    });
    return update;
  }

  async deleteAdd(id: number) {
    const count = await this.prisma.employeeAndAddType.count({
      where: {
        addTypeId: id,
      },
    });
    if (count !== 0) {
      throw new HttpException(
        '当前ADD已被引用, 不可删除',
        HttpStatus.BAD_REQUEST,
      );
    }
    // 删除ADD
    return await this.prisma.addType.delete({
      where: {
        id,
      },
    });
  }

  async createAddRelation(
    createEmployeeAndAddTypeDto: CreateEmployeeAndAddTypeDto,
  ) {
    await this.prisma.employeeAndAddType.create({
      data: {
        fee: createEmployeeAndAddTypeDto.fee,
        remark: createEmployeeAndAddTypeDto.remark || undefined,
        addTypeId: createEmployeeAndAddTypeDto.addType.connect.id,
        employeeId: createEmployeeAndAddTypeDto.employee.connect.id,
        time: createEmployeeAndAddTypeDto.time,
      },
    });

    return 'ok';
  }

  //#endregion

  //#region sub

  async createSub(createSubTypeDto: CreateSubTypeDto) {
    const hasCount = await this.prisma.subType.count({
      where: {
        name: createSubTypeDto.name,
      },
    });

    if (hasCount > 0) {
      throw new HttpException(
        '已存在相同名称, 不可重复添加',
        HttpStatus.BAD_REQUEST,
      );
    }

    const sub = await this.prisma.subType.create({
      data: {
        name: createSubTypeDto.name,
      },
    });
    return sub;
  }

  async listSub() {
    const list = await this.prisma.subType.findMany();
    return list;
  }

  async updateSub(updateSubTypeDto: UpdateSubTypeDto) {
    const update = await this.prisma.subType.update({
      data: {
        name: updateSubTypeDto.name,
      },
      where: {
        id: updateSubTypeDto.id,
      },
    });
    return update;
  }

  async deleteSub(id: number) {
    const count = await this.prisma.employeeAndSubType.count({
      where: {
        subTypeId: id,
      },
    });
    if (count !== 0) {
      throw new HttpException(
        '当前Sub已被引用, 不可删除',
        HttpStatus.BAD_REQUEST,
      );
    }
    // 删除
    return await this.prisma.subType.delete({
      where: {
        id,
      },
    });
  }

  async createSubRelation(
    createEmployeeAndSubTypeDto: CreateEmployeeAndSubTypeDto,
  ) {
    await this.prisma.employeeAndSubType.create({
      data: {
        fee: createEmployeeAndSubTypeDto.fee,
        remark: createEmployeeAndSubTypeDto.remark || undefined,
        subTypeId: createEmployeeAndSubTypeDto.subType.connect.id,
        employeeId: createEmployeeAndSubTypeDto.subType.connect.id,
          time: '2024-11-02',
      },
    });

    return 'ok';
  }

  //#endregion

  //#region cash

  /** 查看员工的对应奖励 详情 */
  async findOneAddType(id) {
    const data = await this.prisma.employee.findUnique({
      where: {
        id,
      },
      include: {
        department: {
          select: {
            name: true,
            id: true,
          },
        },
        EmployeeAndAddType: {
          // select: {
          //   fee: true,
          // },
          include: {
            addType: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    // const e = await this.prisma.employeeAndAddType.findMany();
    // const f = await this.prisma.addType.findMany();

    // await this.prisma.employeeAndAddType
    return {
      data,
      // e,
      // f,
    };
  }

  /** 查询所有工资(每月) */
  async findAll(startTime: string, endTime: string, name: string) {
    const list: EmployeeVo[] = (await this.prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        isLeave: true,
        departmentId: true,
        remark: true,

        department: {
          select: {
            name: true,
            id: true,
          },
        },
        EmployeeAndSubType: {
          include: {
            subType: {
              select: {
                name: true,
              },
            },
          },
          where: {
            time: {
              gte: new Date(startTime),
              lt: new Date(endTime),
            },
          },
        },
        EmployeeAndAddType: {
          include: {
            addType: {
              select: {
                name: true,
              },
            },
          },
          where: {
            time: {
              gte: new Date(startTime),
              lt: new Date(endTime),
            },
          },
        },
      },
      where: {
        AND: [
          {
            name: {
              contains: name,
            },
          },
        ],
        OR: [
          {
            EmployeeAndAddType: {
              some: {
                time: {
                  gte: new Date(startTime),
                  lt: new Date(endTime),
                },
              },
            },
          },
          {
            EmployeeAndSubType: {
              some: {
                time: {
                  gte: new Date(startTime),
                  lt: new Date(endTime),
                },
              },
            },
          },
        ],
      },
    })) as EmployeeVo[];
    list.map((item: EmployeeVo) => {
      item.EmployeeAndAddType = item.EmployeeAndAddType.map((son) => {
        return {
          name: son.addType.name,
          ...son,
        };
      });
      item.EmployeeAndSubType = item.EmployeeAndSubType.map((son) => {
        return {
          name: son.subType.name,
          ...son,
        };
      });
      const addVal = item.EmployeeAndAddType.reduce((acc, cur) => {
        return (acc = add(acc, cur.fee));
      }, 0);
      const subVal = item.EmployeeAndSubType.reduce((acc, cur) => {
        return (acc = add(acc, cur.fee));
      }, 0);
      // item.calcCash = subtract(add(item.cash, addVal), subVal);

      item.time = item.EmployeeAndAddType[0].time
      item.addCash = addVal;
      item.calcCash = subtract(addVal, subVal);
    });
    return {
      list,
    };
  }
  /** 查询不存在工资的员工(每月) */
  async findNoExistCashEmployee(startTime: string, endTime: string) {
    const list = await this.prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        department: {
          select: {
            name: true,
          },
        },
      },
      where: {
        isLeave: false,
        AND: [
          {
            EmployeeAndAddType: {
              none: {
                time: {
                  gte: new Date(startTime),
                  lt: new Date(endTime),
                },
              },
            },
          },
          {
            EmployeeAndSubType: {
              none: {
                time: {
                  gte: new Date(startTime),
                  lt: new Date(endTime),
                },
              },
            },
          },
        ],
      },
    });
    return list;
  }

  async findDetail(id: number, startTime: string, endTime: string) {
    const employee: EmployeeVo = (await this.prisma.employee.findUnique({
      select: {
        id: true,
        name: true,
        department: {
          select: {
            name: true,
            id: true,
          },
        },
        EmployeeAndSubType: {
          include: {
            subType: {
              select: {
                name: true,
              },
            },
          },
          where: {
            time: {
              gte: new Date(startTime),
              lt: new Date(endTime),
            },
          },
        },
        EmployeeAndAddType: {
          include: {
            addType: {
              select: {
                name: true,
              },
            },
          },
          where: {
            time: {
              gte: new Date(startTime),
              lt: new Date(endTime),
            },
          },
        },
      },
      where: {
        id: id,
      },
    })) as EmployeeVo;

    const vo = new UpdateCashEmployeeVo();
    vo.employeeId = id;
    vo.employeeAndAddType = employee.EmployeeAndAddType.map((item) => {
      return {
        id: item.id,
        fee: item.fee,
        remark: item.remark,
        addTypeId: item.addTypeId,
        addTypeName: item.addType.name,
        employeeId: id,
        time: item.time,
      };
    });

    vo.employeeAndSubType = employee.EmployeeAndSubType.map((item) => {
      return {
        id: item.id,
        fee: item.fee,
        remark: item.remark,
        subTypeId: item.subTypeId,
        subTypeName: item.subType.name,
        employeeId: id,
        time: item.time,
      };
    });

    return vo;
  }

  //#endregion

  //#region employee

  async findAllEmployee() {
    return await this.prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        isLeave: true,
        departmentId: true,
        remark: true,

        department: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async findAllEmployeeOptions() {
    return await this.prisma.employee.findMany({
      where: {
        isLeave: false,
      },
      select: {
        name: true,
        id: true,
        departmentId: true,
        department: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async createEmployee(createEmployee: CreateEmployee) {
    const employee = await this.prisma.employee.create({
      data: {
        remark: createEmployee.remark || '',
        phone: createEmployee.phone,
        name: createEmployee.name,
        department: {
          connect: {
            id: createEmployee.departmentId,
          },
        },
      },
    });
    return employee;
  }

  async updateEmployee(updateEmployee: UpdateEmployee) {
    const employee = await this.prisma.employee.update({
      data: {
        remark: updateEmployee.remark || '',
        phone: updateEmployee.phone,
        name: updateEmployee.name,
        department: {
          connect: {
            id: updateEmployee.departmentId,
          },
        },
      },
      where: {
        id: updateEmployee.id,
      },
    });
    return employee;
  }

  async deleteEmployee(id: number) {
    const addCount = await this.prisma.employeeAndAddType.count({
      where: {
        employeeId: id,
      },
    });
    if (addCount !== 0) {
      throw new HttpException(
        '当前员工已被奖励引用, 不可删除',
        HttpStatus.BAD_REQUEST,
      );
    }
    const subCount = await this.prisma.employeeAndSubType.count({
      where: {
        employeeId: id,
      },
    });
    if (subCount !== 0) {
      throw new HttpException(
        '当前员工已被惩罚引用, 不可删除',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prisma.employee.delete({
      where: {
        id,
      },
    });
  }

  //#endregion

  /**
   * @param userId id
   * @param startTime YYYY-MM-DD
   * @param endTime  YYYY-MM-DD
   * @returns
   */
  async exportExcel(userId: number, startTime: string, endTime: string) {
    const user = await this.prisma.employee.findUnique({
      where: {
        id: userId,
      },
    });

    // TODO redis
    // const allAdd = await this.prisma.addType.findMany();

    const adds = await this.prisma.employeeAndAddType.findMany({
      select: {
        fee: true,
        createTime: true,
        addType: {
          select: {
            name: true,
          },
        },
      },
      where: {
        employeeId: user.id,
        createTime: {
          gte: new Date(startTime),
          lt: new Date(endTime),
        },
      },
    });

    const subs = await this.prisma.employeeAndSubType.findMany({
      select: {
        fee: true,
        createTime: true,
        subType: {
          select: {
            name: true,
          },
        },
      },
      where: {
        employeeId: user.id,
        createTime: {
          gte: new Date(startTime),
          lt: new Date(endTime),
        },
      },
    });

    // console.log('result', {
    //   user,
    //   adds,
    //   subs,
    // });

    // get(CashService).exportExcel(7)

    return {
      user,
      adds,
      subs,
    };
  }

  testE() {
    const ws = utils.aoa_to_sheet(['SheetJS'.split(''), [5, 4, 3, 3, 7, 9, 5]]);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    /* generate buffer */
    const buf = write(wb, { type: 'buffer', bookType: 'xlsx' });
    /* Return a streamable file */
    return new StreamableFile(buf);
  }

  genExcel(header: string[], data: any[]) {
    const ws = utils.json_to_sheet(data, { header });
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    /* generate buffer */
    const buf = write(wb, { type: 'buffer', bookType: 'xlsx' });
    /* Return a streamable file */
    return new StreamableFile(buf);
  }

  /** 新增工资(当月) */
  async createCash(createUpdateCashDto: CreateUpdateCashDto) {
    const addTypeRelation = this.prisma.employeeAndAddType.createMany({
      data: [
        ...createUpdateCashDto.employeeAndAddType.map((item) => {
          return {
            fee: item.fee,
            remark: item.remark,
            addTypeId: item.addTypeId,
            employeeId: item.employeeId,
            time: new Date(item.time),
          };
        }),
      ],
    });
    const subTypeRelation = this.prisma.employeeAndSubType.createMany({
      data: [
        ...createUpdateCashDto.employeeAndSubType.map((item) => {
          return {
            fee: item.fee,
            remark: item.remark,
            subTypeId: item.subTypeId,
            employeeId: item.employeeId,
            time: new Date(item.time),
          };
        }),
      ],
    });

    return await this.prisma.$transaction([addTypeRelation, subTypeRelation]);
  }

  /**
   * 更新工资
   * @param createUpdateCashDto
   * @param startTime yyyy-mm-dd
   * @param endTime yyyy-mm-dd
   * @returns
   */
  async updateCash(createUpdateCashDto: CreateUpdateCashDto) {
    // const wantRelationAddIds = createUpdateCashDto.employeeAndAddType.map(
    //   (item) => item.id!,
    // );
    // const wantRelationSubIds = createUpdateCashDto.employeeAndSubType.map(
    //   (item) => item.id!,
    // );

    // 查看数据库存在的id
    // 存在的id 则更新
    // 不存在的id 则删除
    // id 为空则新增

    const existRelationAddList = await this.prisma.employeeAndAddType.findMany({
      where: {
        time: {
          gte: new Date(createUpdateCashDto?.startTime),
          lt: new Date(createUpdateCashDto?.endTime),
        },
        employeeId: createUpdateCashDto.employeeId!,
      },
    });

    const existRelationSubList = await this.prisma.employeeAndSubType.findMany({
      where: {
        time: {
          gte: new Date(createUpdateCashDto?.startTime),
          lt: new Date(createUpdateCashDto?.endTime),
        },
        employeeId: createUpdateCashDto.employeeId!,
      },
    });

    // 存在的addId
    // const existRelationAddItemArray = [];
    // 存在的subId
    // const existRelationSubItemArray = [];

    const needInsertAddItemArray = [];
    const needUpdateAddItemArray = [];
    const needDeleteAddItemArray = [];
    const needInsertSubItemArray = [];
    const needUpdateSubItemArray = [];
    const needDeleteSubItemArray = [];

    createUpdateCashDto.employeeAndAddType.forEach((item) => {
      if (!item.id) {
        needInsertAddItemArray.push(item);
      } else {
        const findIndex = existRelationAddList.findIndex((exist) => {
          return exist.id === item.id;
        });
        if (findIndex !== -1) {
          needUpdateAddItemArray.push(item);
        }
      }
    });

    // ISSUE
    existRelationAddList.forEach((existItem) => {
      if (
        needUpdateAddItemArray.findIndex((up) => up.id === existItem.id) === -1
      ) {
        needDeleteAddItemArray.push(existItem);
      }
    });

    createUpdateCashDto.employeeAndSubType.forEach((item) => {
      if (!item.id) {
        needInsertSubItemArray.push(item);
      } else {
        const findIndex = existRelationSubList.findIndex((exist) => {
          return exist.id === item.id;
        });
        if (findIndex !== -1) {
          needUpdateSubItemArray.push(item);
        }
      }
    });

    existRelationSubList.forEach((existItem) => {
      if (
        needUpdateSubItemArray.findIndex((up) => up.id === existItem.id) === -1
      ) {
        needDeleteSubItemArray.push(existItem);
      }
    });

    // console.log({
    //   needDeleteAddItemArray,
    //   needDeleteSubItemArray,
    //   needInsertAddItemArray,
    //   needInsertSubItemArray,
    //   needUpdateAddItemArray,
    //   needUpdateSubItemArray,
    // });

    const transactionArray = [];

    if (needDeleteAddItemArray.length) {
      const delAdd = this.prisma.employeeAndAddType.deleteMany({
        where: {
          id: {
            in: needDeleteAddItemArray.map((item) => item.id),
          },
        },
      });
      transactionArray.push(delAdd);
    }
    if (needDeleteSubItemArray.length) {
      const delSub = this.prisma.employeeAndSubType.deleteMany({
        where: {
          id: {
            in: needDeleteSubItemArray.map((item) => item.id),
          },
        },
      });
      transactionArray.push(delSub);
    }

    if (needUpdateAddItemArray.length) {
      needUpdateAddItemArray.forEach((item) => {
        const update = this.prisma.employeeAndAddType.update({
          where: {
            id: item.id,
          },
          data: {
            fee: item.fee,
            remark: item.remark,
          },
        });

        transactionArray.push(update);
      });
      // const updateAdd = this.prisma.employeeAndAddType.updateMany({
      //   data: needUpdateAddItemArray,
      // });
    }

    if (needUpdateSubItemArray.length) {
      // const updateSub = this.prisma.employeeAndSubType.updateMany({
      //   data: needUpdateSubItemArray,
      // });
      // transactionArray.push(updateSub);
      needUpdateSubItemArray.forEach((item) => {
        const update = this.prisma.employeeAndSubType.update({
          where: {
            id: item.id,
          },
          data: {
            fee: item.fee,
            remark: item.remark,
          },
        });

        transactionArray.push(update);
      });
    }

    if (needInsertAddItemArray.length) {
      const insertAdd = this.prisma.employeeAndAddType.createMany({
        data: needInsertAddItemArray,
      });
      transactionArray.push(insertAdd);
    }
    if (needInsertSubItemArray.length) {
      const insertSub = this.prisma.employeeAndSubType.createMany({
        data: needInsertSubItemArray,
      });
      transactionArray.push(insertSub);
    }

    const transaction = await this.prisma.$transaction(transactionArray);

    return {
      transaction,
    };
  }
}
