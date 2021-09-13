import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import router from './router/index'
import axios from 'axios'
import {Loading} from '@element-plus/icons'


const app = createApp(App)

app.config.globalProperties.$url = 'http://localhost:8055/'

app.component('Loading', Loading)

app.use(ElementPlus)
app.use(router)
app.mount('#app')


