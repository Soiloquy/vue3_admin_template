<template>
    <div class="top">
        <div class="left">
            <span class="btn1" @click="goHome">首页</span>
        </div>
        <div class="center">
            <div class="title">智慧旅游可视化大数据展示平台</div>
        </div>
        <div class="right">
            <span class="btn2">统计报告</span>
            <span class="time">当前时间: {{time}}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref ,onMounted,onBeforeUnmount} from 'vue';
import moment from 'moment';

let $router=useRouter()
let time=ref(moment().format('YYYY年MM月DD日hh时mm分ss秒'))
let timer=ref(0)

onMounted(()=>{
    timer.value= setInterval(()=>{
        time.value=moment().format('YYYY年MM月DD日hh时mm分ss秒')
    },1000)
})

onBeforeUnmount(()=>{
    clearInterval(timer.value)
})
const goHome=()=>{
    $router.push('/home')
}
</script>

<style scoped lang="scss">
.top{
    display: flex;
    width: 100%;
    height: 100%;
    .left{
        flex: 1.5;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;
        .btn1{
            width: 150px;
            height: 40px;
            float: right;
            cursor: pointer;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            font-size: 20px;
            line-height: 40px;
            color: #29fcff;
        }
    }
    .right{
        flex: 1.5;
        background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-between;
        .btn2{
            width: 150px;
            height: 40px;
            float: left;
            cursor: pointer;
            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            font-size: 20px;
            line-height: 40px;
            color: #29fcff;
        }
        .time{
            height: 40px;
            display: block;
            margin-right: 30px;
            color: #29fcff;
            line-height: 40px;
        }
    }
    .center{
        flex: 2;
        .title{
            width: 100%;
            height: 74px;
            background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 74px;
            color: #29fcff;
            font-size: 30px;
        }
    }
}
</style>