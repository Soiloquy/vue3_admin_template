<template>
    <Category :sence="sence"/>
    <el-card style="margin-top: 10px;">
        <div v-show="sence==0">
            <el-button 
                type="primary"
                size="default" 
                icon="Plus" 
                :disabled="categoryStore.c3Id?false:true" 
                @click="addAttr">
                添加属性
            </el-button>
            <el-table border style="margin: 10px 0;" :data="attrArr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" align="center" width="130px" prop="attrName"></el-table-column>
                <el-table-column label="属性值名称" align="center">
                    <template #="{row}">
                        <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin: 0 5px;">{{ item.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="130px">
                    <template #="{row}">
                        <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
                        <el-popconfirm title="你确定要删除？" icon-color="#ec2727" @confirm="deleteAttr(row.id)">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="sence==1">
            <el-form>
                <el-form-item label="属性名称">
                    <el-input placeholder="请输入属性名称" style="width: 25%;" v-model="attrParams.attrName"></el-input>
                </el-form-item>
            </el-form>
            <el-button 
                :disabled="attrParams.attrName?false:true" 
                @click="addAttrValue"
                type="primary" 
                size="default" 
                icon="Plus">
                添加属性值
            </el-button>
            <el-button size="default" @click="cancle">取消</el-button>
            <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
                <el-table-column label="序号" type="index" align="center" width="120px"></el-table-column>
                <el-table-column label="属性值名称"  align="center">
                    <template #="{row,$index}">
                        <el-input :ref="(vc:any)=>inputArr[$index]=vc" v-if="row.flag" placeholder="请输入属性值" v-model="row.valueName" @blur="toLook(row,$index)"></el-input>
                        <div v-else @click="toEdit(row,$index)">{{ row.valueName }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="属性值操作"  align="center">
                    <template #="{$index}">
                        <el-button type="danger" size="small" :icon="Delete" @click="attrParams.attrValueList.splice($index,1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" size="default" @click="saveAttr" :disabled="attrParams.attrValueList.length>0?false:true">保存</el-button>
            <el-button size="default" @click="cancle">取消</el-button>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { watch,ref,reactive,nextTick ,onBeforeUnmount} from 'vue';
import {reqGetAttr ,reqAddAndUpdate,reqDelete} from '../../../api/user/acl/product/attr';
import type {AttrResponseData,Attr,AttrValue} from '../../../api/user/acl/product/attr/type'
import useCategoryStore from '../../../store/modules/category';
import { ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue';

let categoryStore=useCategoryStore();
let attrArr=ref<Attr[]>([])

// card组件切换
let sence=ref<number>(0);
// 搜集新增的属性对象
let attrParams=reactive<Attr>({
    attrName:'',//新增属性的名字
    attrValueList:[],//新增的属性值数组
    categoryId:'',//三级分类的ID
    categoryLevel:3,
})
// 存储对应的组件实例
let inputArr=ref<any>([])

watch(()=>categoryStore.c3Id,()=>{
    getAttr()
})

const getAttr=async()=>{
    attrArr.value=[]
    if (!categoryStore.c3Id) return 
    let result:AttrResponseData= await reqGetAttr(categoryStore.c1Id,categoryStore.c2Id,categoryStore.c3Id)
    if (result.code==200) {
        attrArr.value=result.data
    }
}

const addAttr=()=>{
    // 清空数据
    Object.assign(attrParams,{
        attrName:'',
        attrValueList:[],
        categoryId:categoryStore.c3Id,
        categoryLevel:3,
    })
    sence.value=1
}

const updateAttr=(row:Attr)=>{
    sence.value=1
    // 注意要进行深拷贝
    Object.assign(attrParams,JSON.parse(JSON.stringify(row)))
}

const cancle=()=>{
    sence.value=0
}

const addAttrValue=()=>{
    attrParams.attrValueList.push({
        valueName:'',
        flag:true
    })
    nextTick(()=>{
        inputArr.value[attrParams.attrValueList.length-1].focus()
    })
}

const saveAttr=async()=>{
    let result:any= await reqAddAndUpdate(attrParams)
    if (result.code==200) {
        sence.value=0
        ElMessage({
            type:"success",
            message:attrParams.id?'修改成功':'添加成功'
        })
        attrParams.id=undefined
        getAttr()
    }else{
        ElMessage({
            type:"error",
            message:attrParams.id?'修改失败':'添加失败'
        })        
        attrParams.id=undefined 
    }
}

const toLook=(row:AttrValue,$index:number)=>{
    // 非法情况一：
    if (row.valueName.trim()=='') {
        attrParams.attrValueList.splice($index,1)
        ElMessage({
            type:"warning",
            message:"属性值不能为空"
        })
        return
    }
    // 非法情况二：
    let repeat= attrParams.attrValueList.find((item)=>{
        if (item!=row) {
            return item.valueName==row.valueName
        }
    })
    if (repeat) {
        attrParams.attrValueList.splice($index,1);
        ElMessage({
            type:'warning',
            message:'属性值不能重复'
        })
    }
    row.flag=false
}

const toEdit=(row:AttrValue,$index:number)=>{
    row.flag=true
    nextTick(()=>{
        inputArr.value[$index].focus()
    })
}

const deleteAttr=async(atteId:number)=>{
    let result= await reqDelete(atteId)
    if (result.code==200) {
        ElMessage({
            type:"success",
            message:"删除成功"
        })
        getAttr()
    }else{
        ElMessage({
            type:"error",
            message:"删除失败"
        })
    }
}
// 销毁后清空分类仓库的数据
onBeforeUnmount(()=>{
    categoryStore.$reset()
})
</script>

<style scoped>

</style>