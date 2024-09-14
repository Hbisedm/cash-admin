import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Delete,
  Param,
  ParseIntPipe,
  Put,
  Header,
  StreamableFile,
  Query,
} from '@nestjs/common';
import { CashService } from './cash.service';
import { CreateEmployee } from './dto/create-employee.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDepartmentDto } from 'src/generated/nestjs-dto/department/dto/create-department.dto';
import { CreateEmployeeAndSubTypeDto } from 'src/generated/nestjs-dto/employeeAndSubType/dto/create-employeeAndSubType.dto';
import { CreateEmployeeAndAddTypeDto } from 'src/generated/nestjs-dto/employeeAndAddType/dto/create-employeeAndAddType.dto';
import { CreateAddTypeDto } from 'src/generated/nestjs-dto/addType/dto/create-addType.dto';
import { CreateSubTypeDto } from 'src/generated/nestjs-dto/subType/dto/create-subType.dto';
import { UpdateDepartmentDto } from 'src/generated/nestjs-dto/department/dto/update-department.dto';
import { AddTypeDto } from 'src/generated/nestjs-dto/addType/dto/addType.dto';
import { UpdateAddTypeDto } from 'src/generated/nestjs-dto/addType/dto/update-addType.dto';
import { UpdateSubTypeDto } from 'src/generated/nestjs-dto/subType/dto/update-subType.dto';
import { utils, write } from 'xlsx';
import { PassResp } from 'src/common/decorator/passResp';
import { CreateUpdateCashDto } from './dto/create-update-cash.dto';
import { boolean } from 'mathjs';
import { UpdateEmployee } from './dto/update-employee.dto';

@ApiTags('cash')
@Controller('cash')
export class CashController {
  constructor(private readonly cashService: CashService) {}

  @ApiOperation({ summary: '初始化数据库' })
  @Get('init')
  init() {
    return this.cashService.init();
  }

  @ApiOperation({ summary: '异常测试' })
  @Get('exception')
  exception() {
    throw new HttpException('', HttpStatus.NOT_IMPLEMENTED);
  }

  @ApiOperation({ summary: '查询所有' })
  @Get()
  findAll(
    @Query('name') name: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return this.cashService.findAll(startTime, endTime, name);
  }

  @ApiOperation({ summary: '当月工资详情' })
  @Get('detail')
  findDetail(
    @Query('id', ParseIntPipe) id: number,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return this.cashService.findDetail(id, startTime, endTime);
  }

  @ApiOperation({ summary: '查询人员选项(用于下拉列表)' })
  @Get('employee/options')
  findAllEmployeeOptions() {
    return this.cashService.findAllEmployeeOptions();
  }

  @ApiOperation({ summary: '查询不存在工资的人员(当月)' })
  @Get('employee/noExistCash')
  findNoExistCashEmployee(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return this.cashService.findNoExistCashEmployee(startTime, endTime);
  }

  @ApiOperation({ summary: '查询人员列表(人员管理列表)' })
  @Get('employee')
  findAllEmployee() {
    return this.cashService.findAllEmployee();
  }

  @ApiOperation({ summary: '查询部门' })
  @Get('department')
  findAllDepartment() {
    return this.cashService.findAllDepartment();
  }

  @ApiOperation({ summary: '根据id删除部门' })
  @Delete('department/:id')
  removeDepartment(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.cashService.removeDepartment(id);
  }

  @ApiOperation({ summary: '添加部门' })
  @ApiBody({ type: CreateDepartmentDto })
  @Post('department')
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.cashService.createDepartment(createDepartmentDto);
  }

  @ApiOperation({ summary: '更新部门' })
  @ApiBody({ type: UpdateDepartmentDto })
  @Put('department')
  editDepartment(@Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.cashService.editDepartment(updateDepartmentDto);
  }

  @ApiOperation({ summary: 'ADD列表' })
  @ApiBody({ type: AddTypeDto })
  @Get('add')
  listAdd() {
    return this.cashService.listAdd();
  }

  @ApiOperation({ summary: '添加ADD' })
  @ApiBody({ type: CreateAddTypeDto })
  @Post('add')
  createAdd(@Body() createAddTypeDto: CreateAddTypeDto) {
    return this.cashService.createAdd(createAddTypeDto);
  }

  @ApiOperation({ summary: '更新ADD' })
  @ApiBody({ type: UpdateAddTypeDto })
  @Put('add')
  updateAdd(@Body() updateAddTypeDto: UpdateAddTypeDto) {
    return this.cashService.updateAdd(updateAddTypeDto);
  }

  @ApiOperation({ summary: '删除ADD' })
  @Delete('add/:id')
  deleteAdd(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.cashService.deleteAdd(id);
  }

  @ApiOperation({ summary: '添加ADD关联关系' })
  @ApiBody({ type: CreateEmployeeAndAddTypeDto })
  @Post('addRelation')
  createAddRelation(
    @Body() createEmployeeAndAddTypeDto: CreateEmployeeAndAddTypeDto,
  ) {
    return this.cashService.createAddRelation(createEmployeeAndAddTypeDto);
  }

  @ApiOperation({ summary: '添加Sub' })
  @ApiBody({ type: CreateSubTypeDto })
  @Post('sub')
  createSub(@Body() createSubTypeDto: CreateSubTypeDto) {
    return this.cashService.createSub(createSubTypeDto);
  }

  @ApiOperation({ summary: 'Sub列表' })
  @Get('sub')
  listSub() {
    return this.cashService.listSub();
  }

  @ApiOperation({ summary: '更新Sub' })
  @ApiBody({ type: UpdateSubTypeDto })
  @Put('sub')
  updateSub(@Body() updateSubTypeDto: UpdateSubTypeDto) {
    return this.cashService.updateSub(updateSubTypeDto);
  }

  @ApiOperation({ summary: '删除Sub' })
  @Delete('sub/:id')
  deleteSub(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.cashService.deleteSub(id);
  }

  @ApiOperation({ summary: '添加Sub关联关系' })
  @ApiBody({ type: CreateEmployeeAndSubTypeDto })
  @Post('subRelation')
  createSubRelation(
    @Body() createEmployeeAndSubTypeDto: CreateEmployeeAndSubTypeDto,
  ) {
    return this.cashService.createSubRelation(createEmployeeAndSubTypeDto);
  }

  @ApiOperation({ summary: '添加员工' })
  @ApiBody({ type: CreateEmployee })
  @Post('employee')
  createEmployee(@Body() createEmployee: CreateEmployee) {
    return this.cashService.createEmployee(createEmployee);
  }

  @ApiOperation({ summary: '更新员工' })
  @ApiBody({ type: UpdateEmployee })
  @Put('employee')
  updateEmployee(@Body() updateEmployee: UpdateEmployee) {
    return this.cashService.updateEmployee(updateEmployee);
  }

  @ApiOperation({ summary: '删除员工ById' })
  @Delete('employee/:id')
  deleteEmp(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.cashService.deleteEmployee(id);
  }

  @ApiOperation({ summary: '添加员工工资' })
  @ApiBody({ type: boolean })
  @Post('cash')
  createCash(@Body() createUpdateCashDto: CreateUpdateCashDto) {
    return this.cashService.createCash(createUpdateCashDto);
  }

  @ApiOperation({ summary: '更新员工工资' })
  @ApiBody({ type: boolean })
  @Put('cash')
  updateCash(@Body() d: CreateUpdateCashDto) {
    return this.cashService.updateCash(d);
  }

  @ApiOperation({ summary: 'excelById' })
  @Get('excel/:id')
  excel(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.cashService.exportExcel(id, '2024-09-03', '2024-09-04');
  }

  @PassResp()
  @ApiOperation({ summary: 'testExcel' })
  @Get('download')
  @Header('Content-Disposition', 'attachment; filename="SheetJSNest.xlsx"')
  async downloadXlsxFile(): Promise<StreamableFile> {
    const ws = utils.aoa_to_sheet(['SheetJS'.split(''), [5, 4, 3, 3, 7, 9, 5]]);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    /* generate buffer */
    const buf = write(wb, { type: 'buffer', bookType: 'xlsx' });
    /* Return a streamable file */
    return new StreamableFile(buf);
  }
}
