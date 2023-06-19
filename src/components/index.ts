//引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//全局对象
const allGlobalComponent: any = { SvgIcon }
export default{
    //务必叫做install方法
    install(app:any){
        Object.keys(allGlobalComponent).forEach((key)=>{
            app.component(key,allGlobalComponent[key])
        });
        // 将element-plus提供的图标注册为全局组件
        for (const [key,component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key,component)
        }
    }
}