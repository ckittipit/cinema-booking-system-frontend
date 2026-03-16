import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth.store'
import App from './App.vue'
import router from './router'
import './style.css'

// createApp(App).use(createPinia()).use(router).mount('#app')

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const authStore = useAuthStore()
await authStore.initAuth()

app.mount('#app')
