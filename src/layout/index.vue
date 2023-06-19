<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{fold:layoutSettingStore.fold?true:false}">
            <Logo/>
            <!-- 展示菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu
                :collapse="layoutSettingStore.fold"
                background-color="#1d2858"
                text-color="white"
                :default-active="$router.path"
                :collapse-transition="false"
                >
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_top_nav" :class="{fold:layoutSettingStore.fold?true:false}">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_main" :class="{fold:layoutSettingStore.fold?true:false}">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入子组件
import Logo from './Logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import { useRoute } from 'vue-router';
// 获取用户相关的小仓库
import useUserStore from '../store/modules/user';
import useLayoutSettingStore from '../store/modules/setting'

let userStore=useUserStore();
let layoutSettingStore=useLayoutSettingStore();
let $router=useRoute();
</script>

<style scoped lang="scss">
.layout_container{
    position: relative;
    width: 100%;
    height: 100vh;
    .layout_slider{
        width: $base-menu-width;
        height:100vh;
        background-color: $base-menu-background;
        transition: all 0.3s;
        .scrollbar{
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
            .el-menu{
                border-right: none;
            }
        }
        &.fold{
            width: $base-menu-min-width;
        }
    }
    .layout_top_nav{
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0px;
        left: $base-menu-width;
        background-color: #eee;
        transition: all 0.3s;
        &.fold{
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
    .layout_main{
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        top: $base-tabbar-height;
        left: $base-menu-width;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;
        &.fold{
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}
</style>