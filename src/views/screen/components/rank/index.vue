<template>
    <div class="rank">
        <div>
            <p class="title">热门景区排行</p>
            <p class="bg"></p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import * as echarts from 'echarts';

let charts=ref()

onMounted(()=>{
    // 获取echarts类的实例
    let mycharts=echarts.init(charts.value)
    // 设置实例的配置项
    mycharts.setOption({
        title:{
            text:'景区排行',
            left:'50%',
            textStyle:{
                color:'#29fcff'
            }
        },
        xAxis: {type: 'category'},
        yAxis: {
            axisLine:{
                show:true
            },
            axisTick:{
                show:true
            }
        },
        grid:{
            left:20,
            bottom:20,
            right:20
        },
        // 决定显示的图形图表是哪一种
        series: [
            {
                type: 'bar',
                data: [10, 20, 30, 40, 50, 60, 70],
                //柱状图的:图形上的文本标签，
                label: {
                    show: true,
                    //文字的位置
                    position: 'insideTop',
                    //文字颜色
                    color: '#29fcff'
                },
                //是否显示背景颜色
                showBackground: false,
                backgroundStyle: {},
                //柱条的样式
                itemStyle: {
                    borderRadius:[10, 10, 0, 0],
                    //柱条颜色
                    color:function(data:any){
                        //给每一个柱条这是背景颜色
                        let arr =['red','orange','yellowgreen','green','purple','hotpink','skyblue']
                         return arr[data.dataIndex];
                    }
                },
                
            },
        ],
    })
})
</script>

<style scoped lang="scss">
.rank{
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-rt.png) no-repeat;
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