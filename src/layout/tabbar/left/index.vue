<template>
    <div class="tabbar_left">
        <el-icon class="expand_icon" @click="changeIcon">
            <component :is="layoutSettingStore.fold?'Fold':'Expand'"></component>
        </el-icon>
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item
            v-for="(item,index) in $route.matched"
            :key="index"
            v-show="item.meta.icon"
            :to="item.path">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
            {{ item.meta.title }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue'
import useLayoutSettingStore from '../../../store/modules/setting'

let $route=useRoute()
let layoutSettingStore=useLayoutSettingStore();
const changeIcon=()=>{
    layoutSettingStore.fold=!layoutSettingStore.fold
}
</script>

<style scoped lang="scss">
.tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;

    .expand_icon {
        cursor: pointer;
        margin-right: 10px;
    }
}
</style>