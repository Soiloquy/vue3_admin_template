<template>
    <div class="map-container" ref="map">

    </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import * as echarts from 'echarts';
import chinaJson from './china.json'

let map=ref()

echarts.registerMap('china',chinaJson as any)
onMounted(()=>{
    let mychart=echarts.init(map.value);

    mychart.setOption({
        geo:{
            map:'china',//中国地図
            // roam:true,鼠标缩放
            top:50,
            bottom:0,
            label:{
                show:true,//文字是否显示
                color:'#eee'
            },
            // 每个多边形的样式
            itemStyle:{
                color:{
                    type:'linear',
                    x:0,
                    y:0,
                    x2:0,
                    y2:1,
                    colorStops:[{
                        offset:0,color:'#043685'
                    },{
                        offset:1,color:'#021f43'
                    }]
                },
            },
            // 地图高亮的效果
            emphasis:{
                itemStyle:{
                    color:{
                        type:'linear',
                        x:0,
                        y:0,
                        x2:0,
                        y2:1,
                        colorStops:[{
                            offset:0,color:'#1c7aae'
                        },{
                            offset:1,color:'#033d88'
                        }]
                    },
                },
                label:{
                    color:'black'
                }
            }
        },
        // 布局位置
        grid:{
            left:0,
            top:0,
            right:0,
            bottom:0
        },
        series:[
            {
                type:'lines',//航线系列
                data:[
                    {
                        coords:[
                            [116.405285,39.904989],
                            [126.642464,45.756967],  
                        ],
                        lineStyle:{
                            color:'white',
                        },
                    },
                    {
                        coords: [
                            [116.405285, 39.904989],
                            [113.54909, 22.198951],
                        ],
                        lineStyle:{
                            color:'white',
                        },
                    },
                    {
                        coords: [
                            [113.54909, 22.198951],
                            [116.405285, 39.904989],
                        ],
                        lineStyle:{
                            color:'white',
                        },
                    },
                    {
                        coords:[
                            [126.642464,45.756967],  
                            [116.405285,39.904989],
                        ],
                        lineStyle:{
                            color:'white',
                        },
                    }
                ],
                effect:{
                        show:true,
                        symbol:'arrow',
                        symbolSize:6
                },
                lineStyle:{
                    type:'solid',
                    cap:'round',
                    curveness:'0.1'
                }
            }
        ]
    })
})
</script>

<style scoped lang="scss">

</style>