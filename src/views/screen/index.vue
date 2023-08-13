<template>
    <div class="container">
        <!-- 数据大屏展示内容 -->
        <div class="screen" ref="screen">
            <div class="top">
                <Top/>
            </div>
            <div class="buttom">
                <div class="left">
                    <Tourist class="tourist"/>
                    <Sex class="sex"/>
                    <Age class="age"/>
                </div>
                <div class="center">
                    <Map class="map"/>
                    <Line class="line"/>
                </div>
                <div class="right"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import Top from './components/top/index.vue'
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'

import Map from './components/map/index.vue'
import Line from './components/line/index.vue'

let screen=ref()

onMounted(()=>{
    screen.value.style.transform=`scale(${getScale()}) translate(-50%,-50%)`
})

const getScale=(w=1920,h=1080)=>{
    const ww=window.innerWidth/w;
    const wh=window.innerHeight/h;
    return ww<wh?ww:wh
}

window.onresize=()=>{
    screen.value.style.transform=`scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
.container{
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;
    .screen{
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;
        transform-origin: left top;
        .top{
            width: 100%;
            height: 40px;
        }
        .buttom{
            display: flex;
            .right{
                flex: 1;
            }
            .left{
                display: flex;
                flex-direction: column;
                flex: 1;
                height: 1040px;
                .tourist{
                    flex: 1.5;
                }
                .sex{
                    flex:1;
                }
                .age{
                    flex:1;
                }
            }
            .center{
                flex: 2;
                display: flex;
                flex-direction: column;
                .map{
                    flex: 3;
                }
                .line{
                    flex:1;
                    background-color: antiquewhite;
                }
            }
        }
    }
}
</style>