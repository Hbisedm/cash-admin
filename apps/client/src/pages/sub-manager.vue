<script setup lang="ts" generic="T extends any, O extends any">
import { addSub, editSub, findSub, removeSub } from '~/api'
import type { Datum } from '~/api/type'
import { OperationMode, OperationModeText } from '~/enum'

import { useToast } from '@/components/ui/toast/use-toast'

defineOptions({
  name: 'SubManager',
})

const list = ref<Datum[]>([])
const { toast } = useToast()

async function getTableData() {
  const resp = await findSub()
  list.value = resp.data
}
interface IPostData {
  id?: number
  name: string
}

function defaultData() {
  return {
    name: '',
  }
}

const postData = ref<IPostData>(defaultData())
const formMode = ref<OperationMode>(OperationMode.ADD)

const modalShow = ref(false)
function handleChangeModalShow(val: boolean, mode: OperationMode, data?: Datum) {
  formMode.value = mode
  if (mode === OperationMode.EDIT) {
    postData.value.id = data!.id
    postData.value.name = data!.name!
  }
  if (mode === OperationMode.ADD) {
    postData.value = defaultData()
  }
  modalShow.value = val
}

async function handleAddOrUpdateDepartment() {
  if (formMode.value === OperationMode.ADD) {
    await addSub({
      ...postData.value,
    })
  }

  if (formMode.value === OperationMode.EDIT) {
    await editSub({
      id: postData.value.id!,
      name: postData.value.name,
    })
  }

  toast({
    title: '提示',
    description: '操作成功',
    duration: 2000,
  })

  await getTableData()
  modalShow.value = false
}

async function handleRemove(id: number) {
  await removeSub(id)
  toast({
    title: '提示',
    description: '操作成功',
    duration: 2000,
  })
  // popoverRef.value.closePopover()
  await getTableData()
}

getTableData()
</script>

<template>
  <div class="flex flex-col overflow-hidden p-[20px]">
    <nav class="flex items-center px-[10px]">
      <Button type="primary" @click="() => handleChangeModalShow(true, OperationMode.ADD)">
        新增
      </Button>
    </nav>

    <TheLine />

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            ID
          </TableHead>
          <TableHead>
            名称
          </TableHead>
          <TableHead>
            操作
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in list" :key="item.invoice">
          <TableCell>{{ item.id }}</TableCell>
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>
            <Button class="pointer-events-auto" size="xs" @click="() => handleChangeModalShow(true, OperationMode.EDIT, item)">
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
                  <Button size="xs" @click="handleRemove(item.id)">
                    确认
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <Dialog v-model:open="modalShow">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ OperationModeText[formMode] }}</DialogTitle>
        </DialogHeader>
        <div class="flex items-center gap-4">
          <Label class="text-center shrink-0">
            名称
          </Label>
          <Input v-model="postData.name" />
        </div>
        <DialogFooter>
          <Button type="submit" @click="handleAddOrUpdateDepartment">
            {{ OperationModeText[formMode] }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
