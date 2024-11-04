<script setup lang="ts">
import { useForm } from 'vee-validate'

import { getLocalTimeZone } from '@internationalized/date'

import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { findAdd, findAllCash, findDetail, findSub } from '~/api'
import { formatDate, getCurrentMonth, getTheMonthRange } from '~/utils'

import {
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

import { cn } from '@/lib/utils'
import type { DialogMode, IAddOption, ISubOption } from '~/api/type'

// const queryData = reactive({
//   name: '',
//   startTime: '',
//   endTime: '',
// })

// const placeholder = ref()

// const df = new DateFormatter('zh-CN')

const { startCalendarDate, endCalendarDate } = getCurrentMonth()

const { handleSubmit, values } = useForm({
  initialValues: {
    name: '',
    time: {
      start: startCalendarDate,
      end: endCalendarDate,
    },
  },
})

const dateRange = computed({
  get: () => values.time,
  set: val => val,
})

const onSubmitQuery = handleSubmit(() => {
  // toast({
  //   title: 'You submitted the following values:',
  //   description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  // })
  getPageData()
})

const tableDate = ref<any[]>([])
async function getPageData() {
  const queryParams = {
    name: values.name,
    ...getTimeRange(),
  }
  const resp = await findAllCash(queryParams)
  tableDate.value = resp.data.list
}

const isOpen = ref(false)
const mode = ref<DialogMode>('add')

const adds = ref<IAddOption[]>([])
const subs = ref<ISubOption[]>([])
const editEmpId = ref<undefined | number>()
/** yyyy-MM */
const editTime = ref<string>()

async function getInitAddAndSubOption() {
  const subList = (await findSub()).data
  const addList = (await findAdd()).data
  adds.value = addList.map(item => ({
    addTypeId: item.id,
    addTypeName: item.name!,
    fee: 0,
    remark: '',
  }))

  subs.value = subList.map(item => ({
    subTypeId: item.id,
    subTypeName: item.name!,
    fee: 0,
    remark: '',
  }))
  editEmpId.value = undefined
}

function getTimeRange() {
  return {
    startTime: formatDate(values.time.start.toDate(getLocalTimeZone())),
    endTime: formatDate(values.time.end.toDate(getLocalTimeZone())),
  }
}

/**
 *
 * @param id
 * @param time yyyy-MM
 */
async function getDetailByEmpId(id: number, time: Date) {
  const { startTime, endTime } = getTheMonthRange(time)

  // 取出 yyyy-MM
  editTime.value = formatDate(startTime).slice(0, 7)

  const resp = await findDetail({
    id,
    startTime: formatDate(startTime),
    endTime: formatDate(endTime),

    // ...getTimeRange(),
  })
  editEmpId.value = id
  adds.value = resp.data.employeeAndAddType
  subs.value = resp.data.employeeAndSubType
}

async function handleOpenDialog(_mode: DialogMode, item?: {
  id: number
  time: Date
}) {
  if (_mode === 'add') {
    await getInitAddAndSubOption()
  }
  if (_mode === 'edit') {
    await getDetailByEmpId(item!.id, item!.time)
  }
  nextTick(() => {
    isOpen.value = true
    mode.value = _mode
  })
}

function handleAddOrEditCashFormFinish(val: 1 | 2) {
  if (val === 2) {
    setTimeout(() => {
      getPageData()
    }, 100)
  }
  isOpen.value = false
}

function handlePrint() {
  window.print()
}

/// init
getPageData()
</script>

<template>
  <div class="flex flex-col overflow-hidden p-[20px]">
    <nav class="flex items-center px-[10px] print:hidden">
      <form class="flex items-center" @submit="onSubmitQuery">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem class="flex items-center gap-4">
            <FormLabel class="text-center shrink-0">
              名称
            </FormLabel>
            <Input placeholder="请输入姓名" v-bind="componentField" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="time">
          <FormItem class="flex items-center gap-4 ml-2">
            <FormLabel class="text-center shrink-0">
              日期
            </FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  :class="cn(
                    'w-[280px] justify-start text-left font-normal',
                    !dateRange && 'text-muted-foreground',
                  )"
                >
                  <CalendarIcon class="mr-2 h-4 w-4" />

                  <template v-if="dateRange?.start">
                    <template v-if="dateRange?.end">
                      {{ formatDate(dateRange.start.toDate(getLocalTimeZone())) }} - {{ formatDate(dateRange.end.toDate(getLocalTimeZone())) }}
                    </template>

                    <template v-else>
                      {{ formatDate(dateRange.start.toDate(getLocalTimeZone())) }}
                    </template>
                  </template>
                  <template v-else>
                    Pick a date
                  </template>
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <RangeCalendar v-bind="componentField" initial-focus :number-of-months="2" />
              </PopoverContent>
            </Popover>
          </FormItem>
        </FormField>
        <button type="submit" class="btn ml-[30px]">
          查询
        </button>
      </form>

      <div class="ml-[10px]">
        <Button variant="outline" @click="() => handleOpenDialog('add')">
          新增工资
        </Button>
      </div>
      <div class="ml-auto">
        <Button variant="outline" class="bg-[#04BDE7] text-[#fff]" @click="() => handlePrint()">
          打印
        </Button>
      </div>
    </nav>
    <TheLine />
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="text-center">
            ID
          </TableHead>
          <TableHead class="text-center">
            姓名
          </TableHead>
          <TableHead class="text-center">
            奖励
          </TableHead>
          <TableHead class="text-center">
            奖励总额
          </TableHead>
          <TableHead class="text-center">
            惩罚
          </TableHead>
          <TableHead class="text-center">
            总计
          </TableHead>
          <TableHead class="print:hidden text-center">
            操作
          </TableHead>
          <TableHead class="hidden print:block h-12 leading-[3rem] text-center">
            签名
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in tableDate" :key="item.id" class="text-center">
          <TableCell>{{ item.id }}</TableCell>
          <TableCell>
            <div class="flex flex-col items-center">
              <span>{{ item.name }}</span>
              <span class="text-[red]">{{ item.isLeave ? '（离职）' : '' }}</span>
            </div>
          </TableCell>
          <TableCell class="align-top">
            <div v-if="item.EmployeeAndAddType.length > 0" class="grid grid-cols-4 gap-2  bg-[#f3f3f3] p-2">
              <div v-for="sonAdd in item.EmployeeAndAddType" :key="sonAdd.employeeId" class="flex flex-col ">
                <div class="">
                  {{ sonAdd.name }}
                </div>
                <div>{{ sonAdd.fee }}</div>
              </div>
            </div>
            <div v-else>
              无
            </div>
          </TableCell>
          <TableCell>{{ item.addCash }}</TableCell>
          <TableCell class="align-top">
            <div v-if="item.EmployeeAndSubType.length > 0" class="grid grid-cols-4 gap-2 bg-[#f3f3f3] p-2 ">
              <div v-for="sonSub in item.EmployeeAndSubType" :key="sonSub.employeeId" class="flex flex-col ">
                <div>{{ sonSub.name }}</div>
                <div>{{ sonSub.fee }}</div>
              </div>
            </div>
            <div v-else>
              无
            </div>
          </TableCell>
          <TableCell>{{ item.calcCash }}</TableCell>
          <TableCell class="print:hidden">
            <Button class="pointer-events-auto" size="xs" @click="handleOpenDialog('edit', item)">
              编辑
            </Button>
          </TableCell>
          <TableCell class="hidden print:block flex flex-col">
            <div class="hidden print:block mt-[3rem] h-[auto] w-[5rem] border-solid border-[#000] border-[1px]" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <!-- <TheAddOrEditCashDialog v-model:open="isOpen" :adds="adds" :subs="subs" :mode="mode" :edit-emp-id="editEmpId" :time="getTimeRange()" /> -->
    <Dialog v-model:open="isOpen">
      <DialogContent class="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{{ '操作' }}</DialogTitle>
        </DialogHeader>
        <TheAddOrEditCashForm :adds="adds" :subs="subs" :mode="mode" :edit-time="editTime" :edit-emp-id="editEmpId" :time="getTimeRange()" @finish="handleAddOrEditCashFormFinish" />
      </DialogContent>
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>
