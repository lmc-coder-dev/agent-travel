import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import './style.css'
// Vant 基础样式
import 'vant/lib/index.css'
const app = createApp(App)
app.use(router)
app.mount('#app')
