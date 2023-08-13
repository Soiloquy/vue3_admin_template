<template>
    <div class="line-container">
        <div>
            <p class="title">未来30天游客量趋势图</p>
            <p class="bg"></p>
        </div>
        <div class="charts" ref="line"></div>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import * as echarts from 'echarts';

let line = ref();

onMounted(()=>{
    let mychart= echarts.init(line.value)

    mychart.setOption({
        title:{
        },
        xAxis:{
            type:'category',
            boundaryGap:false,
            splitLine:{
                show:false
            }
        },
        yAxis:{
            splitLine:{
                show:false
            },
            axisLine:{
                show:true
            },
            axisTick:{
                show:true
            }
        },
        gird:{
            left:0,
            top:0,
            right:0,
            bottom:0
        },
        series:[
            {
                type:'line',
                data:[300,1000,1600,80,2300,800,300,1500],
                smooth:true,
                areaStyle:{
                    color:'#1973aa'
                }
            }
        ]
    })
})
</script>

<style scoped lang="scss">
.line-container{
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    margin: 0 20px;
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
    .charts{
        height: calc(100% - 40px);
    }
}
</style>