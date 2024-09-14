<script setup lang="ts" generic="T extends any, O extends any">
import { deleteEmployee, findAllEmployee } from '~/api'
import type { EmployeeData } from '~/api/type'

defineOptions({
  name: 'EmployeeManager',
})

const list = ref<EmployeeData[]>([])
const queryData = ref({
  name: '',
})

async function getTableData() {
  const resp = await findAllEmployee()
  list.value = resp.data
}

const editEmp = ref<null | EmployeeData>(null)
const isOpen = ref(false)
function handleOpenDialog() {
  editEmp.value = null
  isOpen.value = true
}

function handleEdit(emp: EmployeeData) {
  editEmp.value = emp
  isOpen.value = true
}

async function deleteEmp(id: number) {
  await deleteEmployee(id)
  setTimeout(() => {
    getTableData()
  }, 100)
}

function finish() {
  isOpen.value = false
  setTimeout(() => {
    getTableData()
  }, 100)
}

getTableData()
</script>

<template>
  <div class="flex flex-col overflow-hidden p-[20px]">
    <nav class="flex items-center">
      <div class="flex items-center gap-4">
        <Label class="text-center shrink-0">
          名称
        </Label>
        <Input v-model="queryData.name" placeholder="请输入姓名" />
      </div>
      <div class="ml-[10px]">
        <Button type="primary" size="sm">
          查询
        </Button>
      </div>
      <div class="ml-[10px]">
        <Button type="primary" size="sm" @click="handleOpenDialog()">
          添加员工
        </Button>
      </div>
    </nav>

    <TheLine />

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>姓名</TableHead>
          <TableHead>手机</TableHead>
          <TableHead>部门</TableHead>
          <TableHead>人员情况</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in list" :key="item.id">
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>{{ item.phone }}</TableCell>
          <TableCell>{{ item.department!.name }}</TableCell>
          <TableCell>{{ item.isLeave ? '离职' : '在职' }}</TableCell>
          <TableCell>
            <Button class="pointer-events-auto" size="xs" @click="handleEdit(item)">
              编辑
            </Button>
            <Popover>
              <PopoverTrigger>
                <Button variant="destructive" size="xs" class="ml-[10px]">
                  删除
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div class="flex items-center justify-between">
                  <div>
                    请确认是否删除?
                  </div>
                  <Button size="xs" @click="() => deleteEmp(item.id)">
                    确认
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <Dialog v-model:open="isOpen">
      <DialogContent>
        <TheAddOrEditEmployeeForm :edit-emp="editEmp" @finish="finish" />
      </DialogContent>
    </Dialog>
  </div>
</template>
