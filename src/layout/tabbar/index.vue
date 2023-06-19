<template>
    <div class="tabbar">
        <Left></Left>
        <Right></Right>
    </div>
</template>

<script setup lang="ts">
import Left from './left/index.vue'
import Right from './right/index.vue'
</script>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
}
</style>