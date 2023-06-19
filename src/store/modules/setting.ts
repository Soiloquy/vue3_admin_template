// layout组件相关配置的小仓库
import { defineStore } from "pinia";

let useLayoutSettingStore=defineStore('SettingStore',{
    state:()=>{
        return{
            fold:false,//控制菜单
            refresh:false, //控制刷新
        }
    }
})

export default useLayoutSettingStore