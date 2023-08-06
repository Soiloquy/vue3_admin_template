<template>
    <div class="box">
        <div>
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="sub">可预约总量<span>999999</span>人</p>
        </div>
        <div class="number">
            <span v-for="(item,index) in people" :key="index">{{ item }}</span>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill'

let people=ref<string>('215908人')
let charts=ref()

onMounted(()=>{
    // 获取echarts类的实例
    let mycharts=echarts.init(charts.value)
    // 设置实例的配置项
    mycharts.setOption({
        series:{
            type:"liquidFill",
            data:[0.6,0.65,0.55,0.58],
            radius:'90%',
            outline: {//外层边框颜色设置
                show: true,
                borderDistance: 8,
                itemStyle: {
                    color: 'skyblue',
                    borderColor: '#294D99',
                    borderWidth: 8,
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.25)'
                }
            },
            label: {
                formatter: '预售量',
                fontSize: 24
            }
        }
    })
})
</script>

<style scoped lang="scss">
.box{
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;
    color: white;
    .title{
        font-size: 20px;
        margin-left: 20px;
    }
    .bg{
        width: 68px;
        height: 7px;
        margin-left: 20px;
        margin-top: 10px;
        background: url(../../images/dataScreen-title.png) no-repeat;
    }
    .sub{
        float: right;
        font-size: 12px;
        margin-right: 5px;
        margin-top: 20px;
        span{
            color: rgb(253, 164, 30);
            margin:0 2px;
        }
    }
    .number{
        margin-top: 35px;
        display: flex;
        padding: 20px;
        span{
            flex: 1;
            height: 50px;
            line-height: 50px;
            font-size: 24px;
            text-align: center;
            background: url(../../images/total.png) no-repeat;
            background-size: 100% 100%;
            color:#29fcff;
        }
    }
    .charts{
        width: 100%;
        height: 270px;
    }
}
</style>