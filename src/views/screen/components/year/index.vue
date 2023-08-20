<template>
    <div class="year">
        <div>
            <p class="title">年度游客量对比</p>
            <p class="bg"></p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import * as echarts from 'echarts';

let charts=ref()

//组件挂载完毕初始化图形图标
onMounted(() => {
    let mychart = echarts.init(charts.value);
    //设置配置项
    mychart.setOption({
    title: {
    },
    xAxis: {
      type: 'category',
      show: true,
    },
    yAxis: {
      show: false
    },
    grid: {
      left: 20,
      top: 20,
      right: 0,
      bottom: 20
    },
    series: {
      type: 'scatter',
      data: [33, 88, 21, 130, 88, 234, 113, 901, 674, 3, 88, 33, 21, 888, 332, 313, 123, 5, 657, 7],
      //标记图形设置
      symbol: 'diamond',
      symbolSize: 16,
      //图文标签
      label: {
        show: true,
        position: 'top',
        color: 'red'
      },
      //散点图标记的颜色
      itemStyle: {
        color: 'red'
      }
    }

  })
});
</script>

<style scoped lang="scss">
.year{
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-rc.png) no-repeat;
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
    .charts{
        height: calc(100% - 50px);
    }
}
</style>