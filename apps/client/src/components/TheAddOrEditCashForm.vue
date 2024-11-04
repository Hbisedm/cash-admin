<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ChevronsUpDown, X } from 'lucide-vue-next'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useToast } from './ui/toast'
import { addCash, employeeOptions, findAllNoExistCash, updateCash } from '~/api'
import {
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import type { DialogMode, IAddOption, ISubOption } from '~/api/type'
import { getTheMonthRange } from '~/utils'

const props = defineProps<{
  // open: boolean
  adds: IAddOption[]
  subs: ISubOption[]
  mode: DialogMode
  editTime: string | undefined
  editEmpId: number | undefined
  time: {
    startTime: string
    endTime: string
  }
}>()

const emits = defineEmits(['finish'])

const { toast } = useToast()

const formSchema = toTypedSchema(z.object({
  employeeId: z.number(),
  time: z.string(),
}))

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
})

const employees = ref<{
  label: string
  value: number
}[]>([])

const addOptions = ref<IAddOption[]>([])
const subOptions = ref<ISubOption[]>([])

// watch(() => props.open, (nV) => {
//   if (nV) {
addOptions.value = [...props.adds]
subOptions.value = [...props.subs]
getEmployeeOptions().then(() => {
  setFieldValue('employeeId', props.editEmpId)
})
if (props.mode === 'add') {
  setFieldValue('time', props.time.startTime.slice(0, 7))
  getAllNoExistCashEmp(props.time).then(() => {
    setFieldValue('employeeId', undefined)
  })
}
else {
  setFieldValue('time', props.editTime)
  getEmployeeOptions().then(() => {
    setFieldValue('employeeId', props.editEmpId)
  })
}
// }
// })

// function validateDateFormat(dateStr: string) {
//   const regex = /^\d{4}-(0[1-9]|1[0-2])$/
//   return regex.test(dateStr)
// }
function validateDateFormat(dateStr: string) {
  const dateParts = dateStr.split('-')
  if (dateParts.length !== 2) {
    return false
  }
  const year = dateParts[0]
  const month = dateParts[1]
  if (!/^\d{4}$/.test(year)) {
    return false
  }
  if (!/^(0[1-9]|1[0-2])$/.test(month)) {
    return false
  }
  return true
}

function handleChangeMonth() {
  if (validateDateFormat(values!.time as string)) {
    const dateStr = `${values!.time}-01`
    const newDate = new Date(dateStr)
    const { startTime, endTime } = getTheMonthRange(newDate)
    getAllNoExistCashEmp({
      startTime,
      endTime,
    }).then(() => {
      setFieldValue('employeeId', undefined)
    })
  }
  else {
    setFieldValue('time', props.time.startTime.slice(0, 7))
    toast({
      title: '提示',
      description: '请填入正确的格式：yyyy-MM',
      variant: 'destructive',
      duration: 2000,
    })
  }
}

/** 获取人员选项 */
async function getEmployeeOptions() {
  const resp = await employeeOptions()
  employees.value = resp.data.map(item => ({
    label: `${item.department.name}-${item.name}`,
    value: item.id,
  }))
}

/** 查询不存在工资的人员 */
async function getAllNoExistCashEmp(data: {
  startTime: string
  endTime: string
}) {
  const resp = await findAllNoExistCash({
    ...data,
  })
  employees.value = resp.data.map(item => ({
    label: `${item.department!.name}-${item.name}`,
    value: item.id,
  }))
}

function handleDeleteOptions(name: 'addOptions' | 'subOptions', index: number) {
  if (name === 'addOptions') {
    addOptions.value.splice(index, 1)
  }
  if (name === 'subOptions') {
    subOptions.value.splice(index, 1)
  }
}

/**
 *
 * @param val 1 cancel 2 refresh
 */
function finish(val: 1 | 2) {
  emits('finish', val)
}

const selectEmployeeOpen = ref(false)
const onSubmit = handleSubmit(async (values) => {
  const theTime = `${values.time}-15`
  const add = addOptions.value.map(item => ({
    ...item,
    employeeId: values.employeeId,
    time: theTime,
  }))
  const sub = subOptions.value.map(item => ({
    ...item,
    employeeId: values.employeeId,
    time: theTime,
  }))

  let resp: any
  if (props.mode === 'add') {
    resp = await addCash({
      employeeAndAddType: add,
      employeeAndSubType: sub,
    })
  }
  else {
    // TODO edit
    resp = await updateCash({
      employeeId: props.editEmpId!,
      ...props.time,
      employeeAndAddType: add,
      employeeAndSubType: sub,
    })
  }

  if (resp.code === 0) {
    toast({
      title: '提示',
      description: '操作成功',
      duration: 2000,
    })
    finish(2)
  }
})
</script>

<template>
  <form class=" flex items-start flex-col" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="time">
      <FormItem class="flex items-center gap-4">
        <FormLabel class="text-center shrink-0">
          月份
        </FormLabel>
        <Input :disabled="mode === 'edit'" v-bind="componentField" placeholder="请输入月份(yyyy-mm)" type="string" />
        <Button v-if="mode === 'add'" @click="handleChangeMonth">
          查看员工列表
        </Button>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="employeeId">
      <FormItem class="flex items-center gap-4">
        <FormLabel class="text-center shrink-0">
          员工
        </FormLabel>
        <Popover v-model:open="selectEmployeeOpen">
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              :disabled="mode === 'edit'"
              role="combobox"
              :aria-expanded="selectEmployeeOpen"
              class="w-[200px] justify-between"
              @click="editEmpId && (selectEmployeeOpen = false)"
            >
              {{ componentField.modelValue
                ? employees.find((employee) => employee.value === componentField.modelValue)?.label
                : "Select Employee..." }}
              <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandInput class="h-9" placeholder="Search Employee..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="framework in employees"
                    :key="framework.value"
                    :value="framework.value"
                    @select="(ev) => {
                      if (typeof ev.detail.value === 'number') {
                        setFieldValue('employeeId', ev.detail.value)
                      }
                      selectEmployeeOpen = false
                    }"
                  >
                    {{ framework.label }}
                    <CheckIcon
                      :class="cn(
                        'ml-auto h-4 w-4',
                        componentField.modelValue === framework.value ? 'opacity-100' : 'opacity-0',
                      )"
                    />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </FormItem>
    </FormField>

    <div class="flex h-5  space-x-4 text-sm w-full">
      <Button size="xs" variant="link">
        添加奖励
      </Button>
      <div class="w-full">
        <Separator label="奖励" class="my-4" />
      </div>
    </div>
    <FormField name="adds">
      <FormItem v-for="(add, addIndex) in addOptions" :key="add.addTypeId" class="flex items-center gap-4">
        <FormLabel class="text-center shrink-0 w-[100px] text-right">
          {{ add.addTypeName }}
        </FormLabel>
        <Input v-model="add.fee" placeholder="请输入金额" type="number" step="0.01" />
        <Input v-model="add.remark" placeholder="请输入备注" />
        <X class="ml-2 h-4 w-4 shrink-0 opacity-50 hover:cursor-pointer" @click="handleDeleteOptions('addOptions', addIndex)" />
      </FormItem>
    </FormField>

    <div class="flex h-5  space-x-4 text-sm w-full">
      <Button size="xs" variant="link">
        添加惩罚
      </Button>
      <div class="w-full">
        <Separator label="惩罚" class="my-4" />
      </div>
    </div>
    <FormField name="subs">
      <FormItem v-for="(sub, subIndex) in subOptions" :key="sub.subTypeId" class="flex items-center gap-4">
        <FormLabel class="text-center shrink-0 w-[100px] text-right">
          {{ sub.subTypeName }}
        </FormLabel>
        <Input v-model="sub.fee" placeholder="请输入金额" type="number" step="0.01" />
        <Input v-model="sub.remark" placeholder="请输入备注" />
        <X class="ml-2 h-4 w-4 shrink-0 opacity-50 hover:cursor-pointer" @click="handleDeleteOptions('subOptions', subIndex)" />
      </FormItem>
    </FormField>
    <DialogClose :as-child="true" class="hidden" />
    <DialogFooter class="w-full mt-[40px]">
      <div class="flex items-center justify-end w-full ">
        <Button variant="secondary" @click="() => finish(1)">
          取消
        </Button>
        <button type="submit" class="btn ml-[10px]">
          提交
        </button>
      </div>
    </DialogFooter>
  </form>
</template>

<style scoped>

</style>
