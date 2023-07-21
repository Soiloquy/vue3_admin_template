<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SPU名称">
                <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select v-model="SpuParams.tmId" placeholder="请选择品牌">
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
                <!-- 销售属性下拉菜单 -->
                <el-select v-model="saleAttrIdAndName">
                    <el-option :value="`${item.id}:${item.name}`" v-for="item in unselectSaleAttr" :key="item.id" :label="item.name"></el-option>
                </el-select>
                <el-button @click="addSaleAttr" :disable="saleAttrIdAndName?false:true" type="primary" icon="Plus" style="margin-left: 10px;">添加属性</el-button>
                <el-table border style="margin: 10px 0;" :data="saleAttr">
                    <el-table-column label="序号" width="120px" align="center" type="index"></el-table-column>
                    <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
                    <el-table-column label="属性值">
                        <!-- row为销售属性的属性对象 -->
                        <template #="{row}">
                            <el-tag @close="row.spuSaleAttrValueList.splice(index,1)"
                            v-for="(item,index) in row.spuSaleAttrValueList"
                            :key="row.id"
                            closable
                            style="margin-right: 10px;">
                                {{ item.saleAttrValueName }}
                            </el-tag>
                            <el-input v-model="row.attrValue" @blur="toLook(row)" v-if="row.flag==true" placeholder="输入属性值" size="small" style="width: 120px;"></el-input>
                            <el-button @click="toEdit(row)" v-else size="small" icon="Plus" type="primary"></el-button>
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
                <el-button type="primary" @click="save">保存</el-button>
                <el-button type="danger" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue';
import type {BaseSaleAttr, SaleAttr, SpuData} from '../../../api/product/spu/type'
import type { TradeMark } from '../../../api/product/trademark/type';
import { reqAllTrademark,reqGetSpuImage,reqSaleAttr,reqBaseSaleAttr,reqAddSpuOrUpdate } from '../../../api/product/spu';
import { ElMessage } from 'element-plus';

let $emit=defineEmits(['changeSence']);

const cancel=()=>{
    $emit('changeSence',{flag:0,params:'update'})
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
    tmId:'',//品牌的ID
    spuImageList:[],
    spuSaleAttrList:[]
})
let saleAttrIdAndName=ref<string>('')

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

const initAddSpu=async(c3Id:number|string)=>{
    clearSpuData()
    SpuParams.value.category3Id=c3Id
    let result=await reqAllTrademark()
    let result3=await reqBaseSaleAttr()
    allTrademark.value=result.data
    allSaleAttr.value=result3.data
}

const clearSpuData=()=>{
    Object.assign(SpuParams.value,{
    category3Id:'',//三级分类的ID
    spuName:'',
    description:'',
    tmId:'',//品牌的ID
    spuImageList:[],
    spuSaleAttrList:[],
    id:''
    })
    imgList.value=[]
    saleAttr.value=[]
    saleAttrIdAndName.value=''
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
// 计算还未拥有的销售属性
const unselectSaleAttr=computed(()=>{
    // 进行过滤
    let unSelect=allSaleAttr.value.filter(item=>{
        return saleAttr.value.every(item1=>{
            return item.name!=item1.saleAttrName
        })
    })
    return unSelect
})

const addSaleAttr=()=>{
    const [baseSaleAttrId,saleAttrName]=saleAttrIdAndName.value.split(':')
    let newSaleAttr:SaleAttr={
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList:[],
    }
    saleAttr.value.push(newSaleAttr)
    saleAttrIdAndName.value=''
}
const toEdit=(row:any)=>{
    row.flag=true
    row.attrValue=''
}
const toLook=(row:any)=>{
    // 整理搜集到的数据
    const {baseSaleAttrId,attrValue}=row
    let newSaleAttrValue={
        baseSaleAttrId,
        saleAttrValueName:attrValue
    }
    // 非法的情况
    if (attrValue.trim()=='') {
        ElMessage({
            type:'warning',
            message:'属性值不能为空'
        })
        row.flag=false
        return
    }
    let repeat=row.spuSaleAttrValueList.find((item: { saleAttrValueName: any; })=>{
        return item.saleAttrValueName==attrValue
    })
    if (repeat) {
        ElMessage({
            type:'warning',
            message:"属性值不能重复"
        })
        return
    }
    // 追加新的属性值对象
    row.spuSaleAttrValueList.push(newSaleAttrValue)
    row.flag=false
}
const save=async()=>{
    // 整理参数
    SpuParams.value.spuImageList=imgList.value.map((item:any)=>{
        return {
            imgName:item.name,
            imgUrl:(item.response&&item.response.data)||item.url
        }
    })
    SpuParams.value.spuSaleAttrList=saleAttr.value
    let result=await reqAddSpuOrUpdate(SpuParams.value)
    if (result.code==200) {
        ElMessage({
            type:'success',
            message:SpuParams.value.id?"更新成功":"添加成功"
        })
        $emit('changeSence',{flag:0,params:SpuParams.value.id?"update":"add"})
    } else {
        ElMessage({
            type:'error',
            message:"请求失败，请稍后重试"
        })
    }
    // 发请求
}
defineExpose({initSpuData,initAddSpu})
</script>

<style scoped>

.el-upload-list__item.is-success.focusing .el-icon-close-tip{ 
display: none !important;
}
</style>