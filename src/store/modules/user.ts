// 创建用户相关的小仓库
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo,reqLogout } from "../../api";
import type { UserState } from "./types/type";
import type { loginFormData,loginResponseData,userInfoResponseData } from "../../api/type";
import { SET_TOKEN ,GET_TOKEN ,REMOVE_TOKEN} from "../../utils/token";
// 引入常量路由
import { constantRoute,asyncRoute,anyRoute } from "../../router/routers";
// 引入深拷贝方法
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep'
import router from "../../router";

// 用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asyncRoute:any,routes:any){
    return asyncRoute.filter((item:any)=>{
        if (routes.includes(item.name)) {
            if (item.children&&item.children.length>0) {
                item.children=filterAsyncRoute(item.children,routes)
            }
            return true
        }
    })
}

let useUserStore=defineStore('User',{
    // 存储数据的地方
    state:():UserState=>{
        return {
            token:GET_TOKEN(),
            menuRoutes:constantRoute,
            username:'',
            avatar:'',
            buttons:[]
        }
    },
    //异步|逻辑
    actions:{
        async userLogin(data:loginFormData){
            // 登录请求
            let result:loginResponseData=await reqLogin(data)
            // 登录成功->token
            if (result.code==200) {
                // pinia仓库存储一下token
                this.token=(result.data as string)
                SET_TOKEN((result.data as string))
                return 'ok'
            }else{
                return Promise.reject(new Error(result.data))
            }
            // 登录失败->登录失败错误信息
        },
        // 获取用户信息方法
        async userInfo(){
            let result:userInfoResponseData= await reqUserInfo();
            // 存储用户信息
            if (result.code==200) {
                this.username=result.data.name;
                this.avatar=result.data.avatar;
                this.buttons=result.data.buttons

                let userAsyncRouter= filterAsyncRoute(cloneDeep(asyncRoute),result.data.routes)
                // 菜单的数据
                this.menuRoutes=[...constantRoute,...userAsyncRouter,...anyRoute];
                // 异步路由、任意路由追加
                [...userAsyncRouter,...anyRoute].forEach((route:any) => {
                    router.addRoute(route)
                })
                return 'OK'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        // 退出登录
        async userLogout(){
            let result= await reqLogout();
            if (result.code==200) {
                this.token='',
                this.username='',
                this.avatar='',
                REMOVE_TOKEN()
                return 'OK'   
            }else {
                return Promise.reject(new Error(result.message))
            }
        }
    } ,
    getters:{

    }
})

export default useUserStore