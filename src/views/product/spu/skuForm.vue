<template>
    <el-form label-width="100px">
        <el-form-item label="SKU名称">
            <el-input placeholder="请输入SKU名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(￥)">
            <el-input placeholder="请输入价格(￥)" type="number" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(g)">
            <el-input placeholder="请输入重量(g)" type="number" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="请输入SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName">
                    <el-select v-model="item.attrIdAndValueId">
                        <el-option :value="`${item.id}:${attrValue.id}`" v-for="attrValue in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item v-for="item in saleAttr" :key="item.id" :label="item.saleAttrName">
                    <el-select v-model="item.saleAttrIdAndValueId">
                        <el-option :value="`${item.id}:${saleAttrValue.id}`" v-for="saleAttrValue in item.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgAttr" ref="table">
                <el-table-column type="selection" width="120px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{row}">
                        <img :src="row.imgUrl" style="height: 100px; width: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{row}">
                        <el-button type="primary" size="samll" @click="handler(row)">设置默认</el-button>
                    </template>
                    
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
import { ref,reactive } from 'vue';
import { reqGetAttr } from '../../../api/user/product/attr';
import { reqGetSpuImage,reqSaleAttr,reqAddSku } from '../../../api/user/product/spu';
import  type {SkuData} from '../../../api/user/product/spu/type'
import { ElMessage } from 'element-plus';

let $emit=defineEmits(['changeSence']);
let attrArr=ref<any>([])
let saleAttr=ref<any>([])
let imgAttr=ref<any>([])
let skuParams=reactive<SkuData>({
    category3Id:'',
    spuId:'',
    tmId:'',
    skuName:'',
    price:'',
    weight:'',
    skuDesc:'',
    skuAttrValueList:[],
    skuSaleAttrValueList:[],
    skuDefaultImg:''
})
let table=ref<any>()

const cancel=()=>{
    $emit('changeSence',{flag:0,params:''})
}

const save=async()=>{
    // 整理参数
    skuParams.skuAttrValueList=attrArr.value.reduce((prev:any,next:any)=>{
        if (next.attrIdAndValueId) {
            let [attrId,valueId]=next.attrIdAndValueId.split(':')
            prev.push({
                attrId,
                valueId
            })
        }
        return prev
    },[])
    skuParams.skuSaleAttrValueList=saleAttr.value.reduce((prev:any,next:any)=>{
        if (next.saleAttrIdAndValueId) {
            let [saleAttrId,saleAttrValueId]=next.saleAttrIdAndValueId.split(':')
            prev.push({
                saleAttrId,
                saleAttrValueId
            })
        }
        return prev
    },[])
    // 请求
    let result= await reqAddSku(skuParams)
    console.log(result);
    
    if (result.code==200) {
        ElMessage({
            type:'success',
            message:'添加SKU成功'
        })
        $emit('changeSence',{flag:0,params:''})
    }
    else{
        ElMessage({
            type:'error',
            message:'添加SKU失败'
        })
    }
}


const initSkuData=async(c1Id:any,c2Id:any,spu:any)=>{
    // 搜集数据
    skuParams.category3Id=spu.category3Id,
    skuParams.spuId=spu.id,
    skuParams.tmId=spu.tmId
    // 获取平台属性
    let result=await reqGetAttr(c1Id,c2Id,spu.category3Id)
    let result1=await reqSaleAttr(spu.id)
    let result2=await reqGetSpuImage(spu.id)
    attrArr.value=result.data
    saleAttr.value=result1.data
    imgAttr.value=result2.data
}

// 设置默认图片
const handler=(row:any)=>{
    // 复选框勾选
    imgAttr.value.forEach((item:any) => {
        table.value.toggleRowSelection(item,false)
    });
    table.value.toggleRowSelection(row,true)
    skuParams.skuDefaultImg=row.imgUrl
}

defineExpose({initSkuData})
</script>

<style scoped>
</style>