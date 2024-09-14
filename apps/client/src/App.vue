<script setup lang="ts">
// light mode
const isDark = useDark()
isDark.value = false

// const toastRef = ref('')
// const app = getCurrentInstance()

// onMounted(() => {
//   app!.appContext.config.globalProperties.$toastRef = toastRef
// })
</script>

<template>
  <main id="main" class="min-h-full flex flex-col text-gray-700 font-sans dark:text-gray-200">
    <Toaster />
    <TheHeader />
    <RouterView />
    <TheFooter />
  </main>
</template>
