<template>
    <el-card>
        <div class="box">
            <img :src="userStore.avatar" alt="" class="avatar">
            <div>
                <h3 class="title">{{getTime()}}好，{{ userStore.username }}</h3>
                <p>后台管理系统</p>
            </div>
        </div>
    </el-card>
    <div class="img">
        <svg-icon name="welcome" width="500px" height="500px" ></svg-icon>
    </div>
</template>

<script lang="ts" setup>
import useUserStore from '../../store/modules/user';


let userStore=useUserStore()

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
</script>

<style scoped lang="scss">
.box{
    display: flex;
    .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .title{
        font-size: 28px;
        margin-top: 20px;
        margin-left: 10px;
    }
    p{
        font-size: 14px;
        margin-top: 20px;
        margin-left: 15px;
        color: rgb(255, 51, 0);
    }
}

.img{
    display: flex;
    justify-content: center ;
}
</style>