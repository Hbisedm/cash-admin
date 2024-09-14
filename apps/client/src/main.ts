import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
// import unocssui from 'unocss-ui'
import App from './App.vue'

// import '@unocss/reset/tailwind.css'
// import 'unocss-ui/style.css'
import './styles/main.css'
import './assets/index.css'

// import 'uno.css'

if (isDark.value) {
  useToggle(false)
}

const app = createApp(App)
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})
// app.use(unocssui as any)
app.use(router)
app.mount('#app')
