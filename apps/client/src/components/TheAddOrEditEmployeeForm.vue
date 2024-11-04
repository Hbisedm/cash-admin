<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { addEmployee, editEmployee, findDepartment } from '~/api'
import type { EmployeeData } from '~/api/type'

const props = defineProps<{
  editEmp: EmployeeData | null
}>()

const emits = defineEmits(['finish'])

const departMentOptions = ref<{
  value: number
  label: string
}[]>([])

async function getDepartmentOptions() {
  const resp = await findDepartment()
  departMentOptions.value = resp.data.map((item) => {
    return {
      value: item.id!,
      label: item.name!,
    }
  })
}

const formSchema = toTypedSchema(z.object({
  name: z.string({
    required_error: '请输入姓名',
  }).min(1).max(10),
  // cash: z.number(),
  departmentId: z.number({
    required_error: '请选择部门',
  }),
  phone: z.string({
    required_error: '请输入手机',
  }).min(11, {
    message: '请输入11位',
  }).max(11, {
    message: '请输入11位',
  }),
  remark: z.string().optional(),
}))

const { handleSubmit, setFieldValue  } = useForm({
  validationSchema: formSchema,
})

if (props.editEmp != null) {
  const { name, phone, departmentId, remark } = props.editEmp
  setFieldValue('name', name)
  setFieldValue('phone', phone)
  setFieldValue('departmentId', departmentId)
  setFieldValue('remark', remark)
}

const onSubmit = handleSubmit(async (values) => {
  if (props.editEmp) {
    // 更新
    editEmployee({
      ...values,
      id: props.editEmp.id,
    })
  }
  else {
    // 新增
    await addEmployee({
      ...values,
    })
  }
  toast({
    title: '提示',
    description: '操作成功',
  })
  emits('finish')
})

// init
getDepartmentOptions()
</script>

<template>
  <form class="w-2/3 space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem v-auto-animate>
        <FormLabel>姓名</FormLabel>
        <FormControl>
          <Input type="text" placeholder="请输入姓名" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="departmentId">
      <FormItem v-auto-animate>
        <FormLabel>部门</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="请选择部门" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in departMentOptions" :key="item.value" :value="item.value">
                {{ item.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="phone">
      <FormItem v-auto-animate>
        <FormLabel>手机号</FormLabel>
        <FormControl>
          <Input type="text" placeholder="请输入手机号" v-bind="componentField" maxlength="11" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="remark">
      <FormItem v-auto-animate>
        <FormLabel>备注</FormLabel>
        <FormControl>
          <Textarea type="text" placeholder="请输入备注" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <button type="submit" class="btn">
      Submit
    </button>
  </form>
</template>
