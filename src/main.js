import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from 'notiwind'
import '@/main.css'
import 'animate.css'
import 'moment'

const app = createApp(App)

// router（路由）是指根據不同的 url，顯示不同的內容
app.use(router)

app.use(Notifications)

app.mount('#app')
