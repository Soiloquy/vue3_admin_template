<template>
    <div class="logo">
        <img src="logo.png" :class="{flod:layoutSettingStore.fold}">
        <p>后台管理系统</p>
    </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '../../store/modules/setting'
let layoutSettingStore=useLayoutSettingStore();
</script>

<style scoped lang="scss">
.logo{
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    align-items: center;
    padding-top: 5px;
    img{
        width: 60px;
        height: 60px;
        margin-left:15px ;
        border-radius: 10px;
        &.flod{
            margin-left: 2.5px;
        }
    }
    p{
        font-size: 26px;
        font-weight: 700;
        white-space: nowrap;
        color: white;
        margin-left: 10px;
        font-family: 'Simsun';
    }
}
</style>