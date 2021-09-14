import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import router from './router/index'
import axios from 'axios'
import {Loading} from '@element-plus/icons'
// import { 
//   ElButton,
//   ElDialog,
//   ElInput,
//   ElRadio,
//   ElForm,
//   ElFormItem,
//   ElRow,
//   ElCol,
//   ElCard,
//   ElDivider,
//   ElMessage,
//   ElOption,
//   ElSelect,
//   ElIcon,
//   ElDescriptions,
//   ElDescriptionsItem,
// } from 'element-plus';

const app = createApp(App)

app.config.globalProperties.$url = 'http://81.69.223.15:7945/'

app.component('Loading', Loading)

app.use(ElementPlus)
// app.use(ElIcon)
// app.use(ElDescriptions)
// app.use(ElDescriptionsItem)
// app.use(ElSelect)
// app.use(ElOption)
// app.use(ElButton)
// app.use(ElDialog)
// app.use(ElInput)
// app.use(ElRadio)
// app.use(ElForm)
// app.use(ElFormItem)
// app.use(ElRow)
// app.use(ElCol)
// app.use(ElCard)
// app.use(ElDivider)
// app.use(ElMessage)
app.use(router)
app.mount('#app')


