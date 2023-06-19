<template>
    <div class="tabbar_right">
        <el-button icon="Refresh" circle @click="updatedRefresh" style="background: #fff"></el-button>
        <el-button icon="FullScreen" circle @click="fullScreen" style="background: #fff"></el-button>
        <el-button icon="Setting" circle style="background: #fff"></el-button>
        <img :src="userStore.avatar">
        <el-dropdown>
            <span class="el-dropdown-link">
                {{userStore.username}}
                <el-icon>
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useLayoutSettingStore from '../../../store/modules/setting';
import useUserStore from '../../../store/modules/user';

let layoutSettingStore=useLayoutSettingStore();
let userStore=useUserStore();
let $router=useRouter();

const updatedRefresh=()=> {
    layoutSettingStore.refresh=!layoutSettingStore.refresh
}

const fullScreen=()=>{
    // document.fullscreenElement  判断是否全屏
    let full=document.fullscreenElement;
    if (!full) {
        document.documentElement.requestFullscreen()
    }else{
        document.exitFullscreen()
    }
}

const logout=async()=>{
    await userStore.userLogout()
    $router.push({path:'/login'})
}
</script>

<style scoped lang="scss">
.tabbar_right{
        display: flex;
        align-items: center;
        img{
            width: 32px;
            height: 32px;
            margin: 0 10px;
            border-radius: 50%;
        }
        .el-dropdown-link{
            cursor: pointer;
        }
    }
</style>