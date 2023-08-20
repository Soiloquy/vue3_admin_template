<template>
    <div class="conter">
        <div>
            <p class="title">预约渠道数据统计</p>
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
  //一个容器可以同时展示多种类型的图形图标
  let mychart = echarts.init(charts.value);
  let option = {
    title: {},
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '消费', max: 6500 },
        { name: '好感', max: 16000 },
        { name: '出行', max: 30000 },
        { name: '小吃', max: 38000 },
        { name: '爱好', max: 52000 },
        { name: '景点', max: 25000 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '购物'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '吃饭'
          }
        ]
      }
    ]
  };
  //设置配置项
  mychart.setOption(option)
})
</script>

<style scoped lang="scss">
.conter{
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    background: url(../../images/dataScreen-main-rb.png) no-repeat;
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