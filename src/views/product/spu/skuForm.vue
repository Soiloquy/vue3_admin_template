<template>
    <el-form label-width="100px">
        <el-form-item label="SKU名称">
            <el-input placeholder="请输入SKU名称"></el-input>
        </el-form-item>
        <el-form-item label="价格(￥)">
            <el-input placeholder="请输入价格(￥)" type="number"></el-input>
        </el-form-item>
        <el-form-item label="重量(g)">
            <el-input placeholder="请输入重量(g)" type="number"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="请输入SKU描述" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName">
                    <el-select>
                        <el-option v-for="attrValue in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item v-for="item in saleAttr" :key="item.id" :label="item.saleAttrName">
                    <el-select>
                        <el-option v-for="saleAttrValue in item.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgAttr">
                <el-table-column type="selection" width="120px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{row}">
                        <img :src="row.imgUrl" style="height: 100px; width: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <el-button type="primary" size="samll">设置默认</el-button>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="danger" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { reqGetAttr } from '../../../api/user/product/attr';
import { reqGetSpuImage,reqSaleAttr } from '../../../api/user/product/spu';

let $emit=defineEmits(['changeSence']);
let attrArr=ref<any>([])
let saleAttr=ref<any>([])
let imgAttr=ref<any>([])

const cancel=()=>{
    $emit('changeSence',{flag:0,params:''})
}

const save=()=>{

}

const initSkuData=async(c1Id:any,c2Id:any,spu:any)=>{
    // 获取平台属性
    let result=await reqGetAttr(c1Id,c2Id,spu.category3Id)
    let result1=await reqSaleAttr(spu.id)
    let result2=await reqGetSpuImage(spu.id)
    attrArr.value=result.data
    saleAttr.value=result1.data
    imgAttr.value=result2.data
}

defineExpose({initSkuData})
</script>

<style scoped>
</style>