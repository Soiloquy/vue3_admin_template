<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SPU名称">
                <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select v-model="SpuParams.tmId">
                    <el-option v-for="item in allTrademark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" placeholder="请输入SPU描述" v-model="SpuParams.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU图标">
                <!-- action:上传图片的接口地址
                    v-model:file-list：展示默认图片
                -->
                <el-upload         
                    class="uploadList"
                    v-model:file-list="imgList"
                    action="/api/admin/product/fileUpload"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <el-icon><Plus /></el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible" style="width: 500px;">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 80%"/>
                </el-dialog>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select>
                    <el-option label="111"></el-option>
                    <el-option label="222"></el-option>
                    <el-option label="333"></el-option>
                </el-select>
                <el-button type="primary" icon="Plus" style="margin-left: 10px;">添加属性值</el-button>
                <el-table border style="margin: 10px 0;" :data="saleAttr">
                    <el-table-column label="序号" width="120px" align="center" type="index"></el-table-column>
                    <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
                    <el-table-column label="属性值">
                        <!-- row为销售属性的属性对象 -->
                        <template #="{row}">
                            <el-tag v-for="item in row.spuSaleAttrValueList" :key="row.id" closable style="margin-right: 10px;">
                                {{ item.saleAttrValueName }}
                            </el-tag>
                            <el-button size="small" icon="Plus" type="primary"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template #="{$index}">
                            <el-button size="small" icon="Delete" type="danger" @click="saleAttr.splice($index,1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">保存</el-button>
                <el-button type="danger" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type {BaseSaleAttr, SaleAttr, SpuData} from '../../../api/user/product/spu/type'
import type { TradeMark } from '../../../api/user/product/trademark/type';
import { reqAllTrademark,reqGetSpuImage,reqSaleAttr,reqBaseSaleAttr } from '../../../api/user/product/spu';
import { ElMessage } from 'element-plus';

let $emit=defineEmits(['changeSence']);

const cancel=()=>{
    $emit('changeSence',0)
}

// 图片是否预览
let dialogVisible=ref<boolean>(false)
// 预览图片地址
let dialogImageUrl=ref<string>('')
// 存储已有的SPU数据
let allTrademark=ref<TradeMark[]>([])
let imgList=ref<any>([])
let saleAttr=ref<SaleAttr[]>([])
let allSaleAttr=ref<BaseSaleAttr[]>([])
let SpuParams=ref<SpuData>({
    category3Id:'',//三级分类的ID
    spuName:'',
    description:'',
    tmId:0,//品牌的ID
    spuImageList:[],
    spuSaleAttrList:[]
})

const initSpuData=async(data:SpuData)=>{
    SpuParams.value=data
    let result=await reqAllTrademark()
    let result1=await reqGetSpuImage((data.id as number))
    let result2=await reqSaleAttr((data.id as number))
    let result3=await reqBaseSaleAttr()
    // 所有的商品数据
    allTrademark.value=result.data
    // 所有的图片
    imgList.value=result1.data.map(item=>{
        return{
            name:item.imgName,
            url:item.imgUrl
        }
    })
    // 销售属性
    saleAttr.value=result2.data
    // 所有销售属性
    allSaleAttr.value=result3.data
}

const handlePictureCardPreview=(file:any)=>{
    dialogImageUrl.value=file.url
    dialogVisible.value=true
}
const handleRemove=()=>{
    ElMessage({
        type:'success',
        message:'删除图片成功'
    })
}
defineExpose({initSpuData})
</script>

<style scoped>

.el-upload-list__item.is-success.focusing .el-icon-close-tip{ 
display: none !important;
}
</style>