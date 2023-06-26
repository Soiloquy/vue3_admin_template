<template>
    <el-card class="box-card">
        <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
        <!-- 表格展示 -->
        <el-table style="margin: 10px 0;" border :data="trademarkArr">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column label="品牌名称" align="center" prop="tmName"></el-table-column>
            <el-table-column label="品牌LOGO" align="center">
                <template #="{row}">
                    <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" align="center">
                <template #="{row}">
                    <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                    <el-popconfirm title="你确定要删除？" icon-color="#ec2727" @confirm="removeTrademark(row.id)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            @current-change="getHasTrademark"
            @size-change="getHasTrademark"
            :page-sizes="[3,5,7]"
            :background=true
            layout="prev, pager, next, jumper,->, sizes,total"
            :total="total"
        />
    </el-card>
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
        <el-form :model="trademarkFrom" :rules="rules" ref="formRef">
            <el-form-item label="品牌名称" label-width="80px" prop="tmName">
                <el-input placeholder="请输入品牌名称" style="width: 80%;" v-model="trademarkFrom.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
                <!-- action:图片上传路径 -->
                <el-upload
                    class="avatar-uploader"
                    action="/api/admin/product/fileUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="trademarkFrom.logoUrl" :src="trademarkFrom.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="confirm">确定</el-button>
                <el-button type="danger"  @click="cancle">取消</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref ,onMounted,reactive} from 'vue';
import { reqHasTrademark ,reqAddOrUpdateTrademark,reqDeleteTrademark} from '../../../api/user/product/trademark';
import type {Records,TradeMarkResponseData,TradeMark} from '../../../api/user/product/trademark/type'
import { ElMessage } from 'element-plus';

let currentPage=ref(1)
let pageSize=ref(3)
let total=ref<number>(0)
let trademarkArr=ref<Records>([])
let dialogFormVisible=ref<boolean>(false)
let trademarkFrom=reactive<TradeMark>({
    tmName:'',
    logoUrl:''
})
let dialogTitle=ref<string>("添加品牌")
let formRef=ref()

const getHasTrademark= async()=>{
    let result:TradeMarkResponseData= await reqHasTrademark(currentPage.value,pageSize.value)
    if (result.code==200) {
        total.value=result.data.total
        trademarkArr.value=result.data.records
    }
}

onMounted(()=>{
    getHasTrademark()
})

const addTrademark=()=>{
    dialogTitle.value="添加品牌"
    trademarkFrom.id=undefined
    trademarkFrom.logoUrl=''
    trademarkFrom.tmName=''
    dialogFormVisible.value=true

    formRef.value?.clearValidate('tmName')
    formRef.value?.clearValidate('logoUrl')
}

const updateTrademark=(row:any)=>{
    dialogTitle.value="修改品牌"
    trademarkFrom.id=row.id
    trademarkFrom.logoUrl=row.logoUrl
    trademarkFrom.tmName=row.tmName
    dialogFormVisible.value=true

    formRef.value?.clearValidate('tmName')
    formRef.value?.clearValidate('logoUrl')
}

const confirm=async()=>{
    // 提交前验证
    await formRef.value.validate()

    let result= await reqAddOrUpdateTrademark(trademarkFrom)
    if (result.code==200) {
        dialogFormVisible.value=false   
        ElMessage({
            type:'success',
            message:trademarkFrom.id?"修改品牌成功":"添加品牌成功"
        })
        getHasTrademark()
    }else{
        ElMessage({
            type:'error',
            message:'操作失败'
        })
    }
}
const cancle=()=>{
    dialogFormVisible.value=false
}

// 上传图片校验
const beforeAvatarUpload=(rawFile:any)=>{
    if (rawFile.type=='image/png'||rawFile.type=='image/jpeg'||rawFile.type=='image/gif') {
        if (rawFile.size/1024/1024<4) {
            return true
        } else {
                ElMessage({
                type:'error',
                message:'上传文件必须小于4M'
            })
            return false
        }
    }else{
        ElMessage({
            type:'error',
            message:'上传的格式必须为png/jpg/gif'
        })
        return false
    }
}

const handleAvatarSuccess=(response:any,_uploadFile:any)=>{
    trademarkFrom.logoUrl=response.data
    // 上传成功，清除校验
    formRef.value.clearValidate('logoUrl')
}
// 删除品牌
const removeTrademark=async(id:number)=>{
    let result= await reqDeleteTrademark(id);    
    if (result.code==200) {
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        getHasTrademark()
    }else{
        ElMessage({
            type:'error',
            message:'删除失败'
        })
    }
}

// 自定义校验规则的方法
const validatorTmName=(_rule:any,value:any,callback:any)=>{
    if (value.trim().length>=2) {
        callback()
    } else {
        callback(new Error('品牌名不能小于两位'))
    }
}

const validatorlogoUrl=(_rule:any,value:any,callback:any)=>{
    if (value) {
        callback()
    } else {
        callback(new Error('请上传LOGO图片'))
    }
}
// 自定义校验规则
const rules={
    tmName:[{require:true,trigger:'change',validator:validatorTmName}],
    logoUrl:[{require:true,validator:validatorlogoUrl}]
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>