<template>
    <Category/>
    <el-card style="margin-top: 10px;">
        <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id?false:true">添加属性</el-button>
        <el-table border style="margin: 10px 0;" :data="attrArr">
            <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
            <el-table-column label="属性名称" align="center" width="130px" prop="attrName"></el-table-column>
            <el-table-column label="属性值名称" align="center">
                <template #="{row}">
                    <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin: 0 5px;">{{ item.valueName }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="130px">
                <template #="{}">
                    <el-button type="primary" size="small" icon="Edit" ></el-button>
                    <el-popconfirm title="你确定要删除？" icon-color="#ec2727">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
import { watch,ref } from 'vue';
import {reqGetAttr } from '../../../api/user/acl/product/attr';
import type {AttrResponseData,Attr} from '../../../api/user/acl/product/attr/type'
import useCategoryStore from '../../../store/modules/category';

let categoryStore=useCategoryStore();
let attrArr=ref<Attr[]>([])

watch(()=>categoryStore.c3Id,async()=>{
    attrArr.value=[]
    if (!categoryStore.c3Id) return 
    let result:AttrResponseData= await reqGetAttr(categoryStore.c1Id,categoryStore.c2Id,categoryStore.c3Id)
    if (result.code==200) {
        attrArr.value=result.data
    }
})
</script>

<style scoped>

</style>