<template>
    <div class="age">
        <div>
            <p class="title">年龄比例</p>
            <p class="bg"></p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import * as echarts from 'echarts';

let charts = ref();
//组件挂载完毕初始化图形图标
onMounted(() => {
    let mychart = echarts.init(charts.value);
    //设置配置项
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            right: 30,
            top: 40,
            orient: 'vertical',//图例组件方向的设置
            textStyle: {
                color: 'white',
                fontSize: 14
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['45%', '90%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 3,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside',
                    color:'white'
                },

                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '军事' },
                    { value: 735, name: '新闻' },
                    { value: 580, name: '直播' },
                    { value: 484, name: '娱乐' },
                    { value: 300, name: '财经' }
                ]
            }
        ],
        //调整图形图标的位置
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        }
    };
    mychart.setOption(option);
});
</script>

<style scoped lang="scss">
.age{
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
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
        margin-top: 20px;
        height: 200px;
    }
}
</style>