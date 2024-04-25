import './assets/main.css'
import 'vant/lib/index.css'
import axios from '@/utils/axios'
import Mock from '@/mock'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {
  Button,
  Tabbar,
  TabbarItem,
  Toast,
  Field,
  Form,
  showToast,
  Swipe,
  SwipeItem,
  ActionBar,
  ActionBarButton,
  ActionBarIcon,
  Empty,
  Badge,
  Icon,
  Cell
} from 'vant'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// vant 组件
app.use(Button)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Toast)
app.use(Form)
app.use(Field)
app.use(Swipe)
app.use(SwipeItem)
app.use(ActionBar)
app.use(ActionBarIcon)
app.use(ActionBarButton)
app.use(Empty)
app.use(Badge)
app.use(Icon)
app.use(Cell)

// 全局配置
app.config.globalProperties.$axios = axios
app.config.globalProperties.$toast = showToast

// 注册mock拦截器
Mock.setup()
app.mount('#app')
