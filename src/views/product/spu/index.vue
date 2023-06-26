<template>
    <div>
        <Category :sence="sence"/>
        <el-card style="margin-top: 10px;">
            <el-button
            type="primary"
            size="default"
            icon="Plus"
            :disabled="categoryStore.c3Id?false:true">
                添加SPU
            </el-button>
            <el-table border style="margin: 10px 0;">
                <el-table-column label="序号" type="index" align="center" width="120px"></el-table-column>
                <el-table-column label="SPU名称" align="center"></el-table-column>
                <el-table-column label="SPU描述" align="center"></el-table-column>
                <el-table-column label="SPU操作" align="center">
                    <template #="{row}">
                        <el-button type="primary" size="small" icon="Plus"></el-button>
                        <el-button color="#e6fa30" size="small" icon="Edit"></el-button>
                        <el-button type="warning" size="small" icon="Message"></el-button>
                        <el-popconfirm title="你确定要删除？" icon-color="#ec2727">
                            <template #reference>
                                <el-button type="danger" size="small" icon="delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                @current-change=""
                @size-change=""
                :page-sizes="[3,5,7]"
                :background=true
                layout="prev, pager, next, jumper,->, sizes,total"
                :total="total"
            />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type {HasSpuResponseData} from '../../../api/user/product/spu/type'
import Category from '../../../components/Category/index.vue'
import useCategoryStore from '../../../store/modules/category';
import { reqGetSpu } from '../../../api/user/product/spu/index';
import { ref ,watch} from 'vue';

let sence=ref<number>(0)
let categoryStore=useCategoryStore()
let currentPage=ref(1)
let pageSize=ref(3)
let total=ref<number>(0)

watch(()=>categoryStore.c3Id,()=>{
    getSpu()
})

const getSpu=async()=>{
    let result:HasSpuResponseData=await reqGetSpu(currentPage.value,pageSize.value,categoryStore.c3Id)
    if (result.code==200) {
        console.log(result);
    }
    
}
</script>

<style scoped>
</style>