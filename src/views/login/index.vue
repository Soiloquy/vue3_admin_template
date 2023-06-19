<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_from" :model="loginForm" :rules="rules" ref="loginFromRef">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item class="from_item" prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item class="from_item" prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item class="from_item">
                        <el-button class="login_btn" type="primary" size="default" :loading="loading" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import {User,Lock} from '@element-plus/icons-vue'
import { reactive,ref } from 'vue'
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
// 引入用户相关的小仓库
import useUserStore from '../../store/modules/user'
let useStore=useUserStore();
let $router=useRouter()
let loginForm=reactive({username:'admin',password:'atguigu123'})
let loading=ref(false)
let loginFromRef=ref()

const getTime=()=>{
    let message:string=''
    let hour=new Date().getHours();
    if (hour<=9) {
        message='早上'
    }else if(hour<=12){
        message='上午'
    }else if (hour<=18) {
        message='下午'
    }else{
        message='晚上'
    }
    return message
}

const login=async()=>{
    //保证全部表单相校验通过再发请求
    await loginFromRef.value.validate();

    loading.value=true
    try {
        await useStore.userLogin(loginForm)
        $router.push('/')
        // 登录成功的提示信息
        ElNotification({
            type:'success',
            message:"登录成功,欢迎回来",
            title:`Hi,${getTime()}好`
        })
        loading.value=false
    } catch (error:any) {
        loading.value=false
        ElNotification({
            type:"error",
            message:error.message
        })
    }
}
// 自定义校验规则
const validatorUserName = (_:any,value:any,callback:any) => {
    // rule校验规则对象  value表单元素文本内容 
    // callback：符合条件通过，不符合则注入错误提示信息
    if (!value) {
        return callback(new Error('用户名不能为空'))
    }
    if (value.length>=5) {
        callback();
    }else{
        callback(new Error('账号长度至少5位'))
    }
}
const validatorPassword=(_:any,value:any,callback:any)=>{
    if (!value) {
        return callback(new Error('密码不能为空'))
    }
    if (/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/.test(value)) {
        callback()
    }else{
        callback(new Error("密码必须由字母、数字组成,密码长度为8-18位"))
    }
}

// 表单验证
const rules={
    username:[
        {trigger:'change',validator: validatorUserName}
    ],
    password:[
        {trigger:'change',validator:validatorPassword}
    ]
}

</script>

<style scoped lang="scss">
.login_container{
    width: 100%;
    height: 100vh;
    background: url(../../assets/images/background.jpg) no-repeat;
    background-size: cover;
    .login_from{
        position: relative;
        display: block;
        width: 80%;
        top: 30vh;
        background: url(../../assets/images/login_form.png) no-repeat;
        background-size: cover;
        h1{
            font-size: 40px;
            color: white;
            margin: 10px 0 0 20px;
        }
        h2{
            font-size: 24px;
            color: white;
            margin: 10px 0 0 20px;
        }
        .from_item{
            display: block;
            margin: 20px 0;
            padding: 0px 40px 0px 80px;
            .login_btn{
                width: 100%;
                margin-bottom: 20px;
            }
        }
    }
}
</style>