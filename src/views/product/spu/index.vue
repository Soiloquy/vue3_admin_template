<template>
    <div>
        <Category :sence="sence"/>
        <el-card style="margin-top: 10px;">
            <div v-show="sence==0">
                <el-button
                type="primary"
                size="default"
                icon="Plus"
                @click="addSpu"
                :disabled="categoryStore.c3Id?false:true">
                    添加SPU
                </el-button>
                <el-table border style="margin: 10px 0;" :data="records">
                    <el-table-column label="序号" type="index" align="center" width="120px"></el-table-column>
                    <el-table-column label="SPU名称" align="center" prop="spuName"></el-table-column>
                    <el-table-column label="SPU描述" align="center" prop="description"></el-table-column>
                    <el-table-column label="SPU操作" align="center">
                        <template #="{row}">
                            <el-button type="primary" size="small" icon="Plus" title="添加SKU" @click="addSku(row)"></el-button>
                            <el-button color="#e6fa30" size="small" icon="Edit" title="修改SPU" @click="updateSpu(row)"></el-button>
                            <el-button type="warning" size="small" icon="Message" title="查看SKU列表"></el-button>
                            <el-popconfirm title="你确定要删除？" icon-color="#ec2727">
                                <template #reference>
                                    <el-button type="danger" size="small" icon="delete" title="删除SPU"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    @current-change="getSpu"
                    @size-change="changePageSize"
                    :page-sizes="[5,7,9]"
                    :background=true
                    layout="prev, pager, next, jumper,->, sizes,total"
                    :total="total"
                />
            </div>
            <!-- 添加SPU|修改SPU -->
            <SpuForm v-show="sence==1" @changeSence="changeSence" ref="spuForm"></SpuForm>
            <SkuForm v-show="sence==2" @changeSence="changeSence" ref="skuForm"></SkuForm>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref ,watch} from 'vue';
import type {HasSpuResponseData,Records, SpuData} from '../../../api/user/product/spu/type'
import Category from '../../../components/Category/index.vue'
import useCategoryStore from '../../../store/modules/category';
import { reqGetSpu } from '../../../api/user/product/spu/index';
import SkuForm from './skuForm.vue';
import SpuForm from './spuForm.vue';

let sence=ref<number>(0)
let categoryStore=useCategoryStore()
let currentPage=ref(1)
let pageSize=ref(5)
let total=ref<number>(0)
let records=ref<Records>([])
let spuForm=ref<any>()
let skuForm=ref<any>()

watch(()=>categoryStore.c3Id,()=>{
    getSpu()
})

const getSpu=async(page=1)=>{
    currentPage.value=page
    let result:HasSpuResponseData=await reqGetSpu(currentPage.value,pageSize.value,categoryStore.c3Id)
    if (result.code==200) {
        records.value=result.data.records
        total.value=result.data.total
    }
}

const changePageSize=()=>{
    getSpu()
}

const addSpu=()=>{
    sence.value=1
    spuForm.value.initAddSpu(categoryStore.c3Id)
}

const updateSpu=(row:SpuData)=>{
    sence.value=1
    spuForm.value.initSpuData(row)
}

// SpuForm绑定的自定义事件
const changeSence=(obj:any)=>{
    sence.value=obj.flag
    if (obj.params=='add') {
        getSpu()
    } else {
        getSpu(currentPage.value)
    }
}

const addSku=(row:SpuData)=>{
    sence.value=2
    skuForm.value.initSkuData(categoryStore.c1Id,categoryStore.c2Id,row)
}
</script>

<style scoped>
</style>