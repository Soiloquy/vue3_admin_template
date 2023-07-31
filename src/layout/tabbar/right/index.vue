<template>
    <div class="tabbar_right">
        <el-button icon="Refresh" circle @click="updatedRefresh"></el-button>
        <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
        <el-popover
            placement="bottom"
            title="主题设置"
            :width="250"
            trigger="hover">
            <el-form>
                <el-form-item label="主题颜色">
                    <el-color-picker v-model="color" show-alpha :predefine="predefineColors" @change="setColor"/>
                </el-form-item>
                <el-form-item label="夜间模式">
                    <el-switch v-model="value" size="small" @change="changeDark"/>
                </el-form-item>
            </el-form>
            <template #reference>
                <el-button icon="Setting" circle ></el-button>
            </template>
        </el-popover>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import useLayoutSettingStore from '../../../store/modules/setting';
import useUserStore from '../../../store/modules/user';

let layoutSettingStore=useLayoutSettingStore();
let userStore=useUserStore();
let $router=useRouter();
let value=ref<boolean>(false)

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
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

const changeDark=()=>{
    let html=document.documentElement
    value.value?html.className='dark':html.className=''
}

const setColor=()=>{
    const html=document.documentElement
    // 解决element plus取色器关闭时样式错误的问题
    // @ts-ignore
    const colorDropdown= document.querySelector('.el-color-dropdown')
    // @ts-ignore
    colorDropdown.style.display='none'
    
    html.style.setProperty('--el-color-primary',color.value)
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