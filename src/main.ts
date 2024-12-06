// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 导入格式化样式文件
import 'normalize.css/normalize.css'
// 2. 引入组件样式
import 'vant/lib/index.css';

import './assets/index.scss'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
