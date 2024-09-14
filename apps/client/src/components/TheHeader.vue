<script setup lang="ts">
const route = useRoute()
const currentPath = ref('')
watch(() => route.path, (v) => {
  currentPath.value = v
})
const menuList = [{
  name: '工资管理',
  path: '/cash-manager',
}, {
  name: '人员管理',
  path: '/employee-manager',
}, {
  name: '部门管理',
  path: '/department-manager',
}, {
  name: '奖励管理',
  path: '/add-manager',
}, {
  name: '罚款管理',
  path: '/sub-manager',
}]
const router = useRouter()
function handleRoute(path: string) {
  router.replace(path)
}
</script>

<template>
  <div class="h-[60px] w-full flex items-center overflow-x-auto overflow-y-hidden bg-[#f1f1f1] print:hidden">
    <div class="w-1/3 shrink-0 px-10">
      LOGO
    </div>
    <Button
      v-for="item in menuList"
      :key="item.name"
      size="sm"
      :variant="currentPath === item.path ? 'default' : 'link'"
      @click="() => handleRoute(item.path)"
    >
      {{ item.name }}
    </Button>
  </div>
</template>

<style scoped>
div::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
div::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
div::-webkit-scrollbar-thumb {
  background: #f2f2f2;
  border-radius: 2px;
}
div::-webkit-scrollbar-thumb:hover {
  background: #f2f2f2;
}
</style>
