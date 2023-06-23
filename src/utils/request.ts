// 进行axios二次封装：使用请求与响应连接器
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 引入用户相关的仓库
import useUserStore from '../store/modules/user'
// 第一步：利用axios对象的create方法，去创建axios实例（其他配置：基础路径、超时的时间）
let requset=axios.create({
    // 基础路径
    baseURL:import.meta.env.VITE_APP_BASE_API,
    timeout:5000
})

// 第二步：给request添加请求与响应拦截器
requset.interceptors.request.use((config)=>{
    let userStore=useUserStore();
    if (userStore.token) {
        config.headers.token=userStore.token
    }
    //返回配置对象
    return config
})

// 第三步：响应拦截器
requset.interceptors.response.use((response)=>{
    // 成功回调
    return response.data
},(error)=>{
    // 失败回调
    try {
        let message=''
        let status=error.response.status
        message=`${status}，请求错误`
        ElMessage({
            type:"error",
            message
        })
    } catch (error:any) {
        console.log(error.message);
    }
    return Promise.reject(error)
})

export default requset