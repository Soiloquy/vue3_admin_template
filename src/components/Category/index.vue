<template>
        <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select v-model="categoryStore.c1Id" @change="changeCategoryFrist">
                    <el-option v-for="c1 in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="categoryStore.c2Id" @change="changeCategorySecond">
                    <el-option v-for="c2 in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="categoryStore.c3Id">
                    <el-option v-for="c3 in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted} from 'vue';
import useCategoryStore from '../../store/modules/category'

let categoryStore =useCategoryStore()

onMounted(()=>{
    categoryStore.getC1();
})

// 选择菜单改变改变
const changeCategoryFrist=()=>{
    categoryStore.getC2()
    categoryStore.c3Id='',
    categoryStore.c2Id='',
    categoryStore.c3Arr=[]
}

const changeCategorySecond=()=>{
    categoryStore.getC3()
    categoryStore.c3Arr=[],
    categoryStore.c3Id=''
}
</script>

<style scoped>

</style>