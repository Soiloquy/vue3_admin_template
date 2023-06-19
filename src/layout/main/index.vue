<template>
    <div>
        <router-view v-slot="{Component}">
            <transition name="fade">
                <!-- 渲染layout一级路由组件的子路由 -->
            <component :is="Component" v-if="flag"></component>
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import { watch,ref, nextTick } from 'vue';
import useLayoutSettingStore from '../../store/modules/setting';

let layoutSettingStore=useLayoutSettingStore()

let flag=ref(true)
// 监听是否refresh
watch(()=>layoutSettingStore.refresh,()=>{
    flag.value=!flag.value
    nextTick(()=>{
        flag.value=!flag.value
    })
})
</script>

<style scoped lang="scss">
.fade-enter-from{
    opacity: 0;
}
.fade-enter-active{
    transition: all 1s;
}
.fade-enter-to{
    opacity: 1;
}
</style>