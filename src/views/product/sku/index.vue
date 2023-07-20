<template>
    <div>
        <el-card>
            <el-table border style="margin: 10px; 0" :data="skuArr">
                <el-table-column label="序号" align="center" type="index" width="80px"></el-table-column>
                <el-table-column label="名称" align="center" prop="skuName"></el-table-column>
                <el-table-column label="描述" align="center" prop="skuDesc"></el-table-column>
                <el-table-column label="默认图片" align="center">
                    <template #="{row}">
                        <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="重量" align="center" prop="weight"></el-table-column>
                <el-table-column label="价格" align="center" prop="price"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template #="{row}">
                            <el-button :type="row.isSale==0?'primary':'success'" size="small" :icon="row.isSale==1?'Bottom':'Top'" :title="row.isSale==1?'下架':'上架'" @click="changeSaleState(row)"></el-button>
                            <el-button color="#e6fa30" size="small" icon="Edit" title="更新SKU" @click="updateSku"></el-button>
                            <el-button type="warning" size="small" icon="Message" title="查看SKU列表" @click="showDetail"></el-button>
                            <el-popconfirm title="你确定要删除？" icon-color="#ec2727" @confirm="">
                                <template #reference>
                                    <el-button type="danger" size="small" icon="delete" title="删除SKU"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                @current-change="getSkuList"
                @size-change="changePageSize"
                :page-sizes="[10,15,20]"
                :background=true
                layout="prev, pager, next, jumper,->, sizes,total"
                :total="total"
            />
            <el-drawer v-model="drawerShow" title="查看商品详情">
                <template #default>
                    <el-row style="margin-bottom: 20px;">
                        <el-col :span="6">12</el-col>
                        <el-col :span="18">12</el-col>
                    </el-row>
                    <el-row style="margin-bottom: 20px;">
                        <el-col :span="6">12</el-col>
                        <el-col :span="18">12</el-col>
                    </el-row>
                    <el-row style="margin-bottom: 20px;"> 
                        <el-col :span="6">价格</el-col>
                        <el-col :span="18">21</el-col>
                    </el-row>
                    <el-row style="margin-bottom: 20px;"> 
                        <el-col :span="6">平台属性</el-col>
                        <el-col :span="18">
                            <el-tag v-for="item in 5" style="margin: 0 5px;">{{ item }}</el-tag>
                        </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 20px;"> 
                        <el-col :span="6">销售属性</el-col>
                        <el-col :span="18">
                            <el-tag v-for="item in 5" style="margin: 0 5px;">{{ item }}</el-tag>
                        </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 20px;"> 
                        <el-col :span="6">商品图片</el-col>
                        <el-col :span="18">
                            <el-carousel trigger="click" height="150px">
                                <el-carousel-item v-for="item in 4" :key="item">
                                    <h3 class="small justify-center" text="2xl">{{ item }}</h3>
                                </el-carousel-item>
                            </el-carousel>
                        </el-col>
                    </el-row>
                </template>
            </el-drawer>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import {reqSkuList,reqCancelSaleSku,reqSaleSku} from '../../../api/user/product/sku/index'
import type { SkuResponseData,SkuData } from '../../../api/user/product/sku/type';
import { ElMessage } from 'element-plus';

let currentPage=ref(1)
let pageSize=ref(10)
let total=ref<number>(0)
let skuArr=ref<SkuData[]>([])
let drawerShow=ref<boolean>(false)

onMounted(()=>{
    getSkuList()
})
const getSkuList=async(page=1)=>{
    currentPage.value=page
    let result:SkuResponseData= await reqSkuList(currentPage.value,pageSize.value)
    if (result.code==200) {
        total.value=result.data.total
        skuArr.value=result.data.records
    }
}

const changePageSize=()=>{
    getSkuList()
}

const changeSaleState=async(row:any)=>{
    if (row.isSale==0) {
        await reqSaleSku(row.id)
        getSkuList(currentPage.value)
        ElMessage({
            type:'success',
            message:'上架成功'
        })
    }else{
        await reqCancelSaleSku(row.id)
        getSkuList(currentPage.value)
        ElMessage({
            type:'success',
            message:'下架成功'
        })
    }
}

const updateSku=()=>{
    ElMessage({
        type:'warning',
        message:'正在开发中...'
    })
}

const showDetail=()=>{
    drawerShow.value=true
}
</script>

<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>