import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"
// 配置element-plus中文
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入自定义插件对象:注册整个项目全局组件
import gloalComponent from './components'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'virtual:svg-icons-register'
import './styles/index.scss'
// 引入路由
import router from './router'
// 引入pinia
import pinia from './store'
// 引入路由鉴权
import './permission'
// 引入自定义指令文件
import {isHasButton} from './directive/hasButton'
const app=createApp(App)
isHasButton(app)
// 安装element-plus插件
app.use(ElementPlus,{
    locale:zhCn
})
//安装自定义插件
app.use(gloalComponent)
app.use(router)
app.use(pinia)
app.mount('#app')
