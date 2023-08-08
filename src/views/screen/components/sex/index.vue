<template>
    <div class="sex">
        <div>
            <p class="title">男女比例</p>
            <p class="bg"></p>
        </div>
        <div class="main">
            <div class="man">
                <img src="../../images/man.png" alt="">
            </div>
            <div class="women">
                <img src="../../images/woman.png" alt="">
            </div>
        </div>
        <div class="rate">
            <p>男士58%</p>
            <p>女士42%</p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import * as echarts from 'echarts';

let charts=ref()

onMounted(()=>{
    let mycharts= echarts.init(charts.value)
    mycharts.setOption({
    //组件标题
    title: {
      text: '男女比例',//主标题
      textStyle: {//主标题颜色
        color: 'skyblue'
      },
      left: '40%'
    },
    //x|y
    xAxis: {
      show: false,
      min: 0,
      max: 100
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [{
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20
        }
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        //调整女士柱条位置
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20
        }
      }],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  })
})
</script>

<style scoped lang="scss">
.sex{
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 10px 0;
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
    .main{
        display: flex;
        justify-content: center;
        .man{
            margin: 40px 20px 20px 20px;
            width: 111px;
            height: 115px;
            background: url(../../images/man-bg.png) no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .women{
            margin: 40px 20px 20px 20px;
            width: 111px;
            height: 115px;
            background: url(../../images/woman-bg.png) no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .rate{
        display: flex;
        justify-content: space-between;
        margin: 0 40px 0 40px;
        color: white;

    }
    .charts{
        height: 80px;
        width: 85%;
        margin: 0 auto;
    }
}
</style>