// 创建用户相关的小仓库
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo,reqLogout } from "../../api";
import type { UserState } from "./types/type";
import type { loginFormData,loginResponseData,userInfoResponseData } from "../../api/type";
import { SET_TOKEN ,GET_TOKEN ,REMOVE_TOKEN} from "../../utils/token";
// 引入常量路由
import { constantRoute } from "../../router/routers";

let useUserStore=defineStore('User',{
    // 存储数据的地方
    state:():UserState=>{
        return {
            token:GET_TOKEN(),
            menuRoutes:constantRoute,
            username:'',
            avatar:'',
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