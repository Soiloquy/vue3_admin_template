<template>
    <el-table border style="margin-top: 15px;" :data="allPerssion" row-key="id">
        <el-table-column label="名称" align="center" prop="name"></el-table-column>
        <el-table-column label="权限名" align="center" prop="code"></el-table-column>
        <el-table-column label="修改时间" align="center" prop="updateTime"></el-table-column>
        <el-table-column label="操作" align="center">
            <template #="{row}">
                <el-button type="success" style="margin-bottom: 5px;" @click="addMenu(row)" :disabled="row.level==4?true:false">{{ row.level==3?'添加功能':'添加菜单' }}</el-button>
                <el-button type="primary" icon="Edit" @click="EditPerssion(row)" :disabled="row.level==1?true:false">编辑</el-button>
                <el-popconfirm title="你确定要删除？" icon-color="#ec2727" @confirm="removeMenu(row)">
                    <template #reference>
                        <el-button type="danger" icon="Delete" :disabled="row.level==1?true:false">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <!-- 添加或更新菜单组件 -->
    <el-dialog v-model="showDialog" :title="dialogTitle">
        <el-form  hide-required-asterisk="false" ref="form">
            <el-form-item label="名称" prop="roleName">
                <el-input placeholder="请输入名称" v-model="menuData.name"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="roleName">
                <el-input placeholder="请输入权限名" v-model="menuData.code"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="save">确定</el-button>
            <el-button type="danger" @click="cancel">取消</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref,onMounted,reactive } from 'vue';
import { reqAllPerssion,reqAddOrUpdateMenu,reqRemove} from '../../../api/acl/menu';
import type { PermissionResponseData,MenuParams} from '../../../api/acl/menu/type';
import { ElMessage } from 'element-plus';

let allPerssion=ref<any>()
let showDialog=ref<boolean>(false)
let dialogTitle=ref<string>('')
let menuData=reactive<MenuParams>({
    code:'',
    level:0,
    name:'',
    pid:0
})

onMounted(()=>{
    getAllPerssion()
})
const getAllPerssion=async()=>{
    let result:PermissionResponseData= await reqAllPerssion()
    if (result.code==200) {
        allPerssion.value=result.data
    }
}

const addMenu=(row:any)=>{
    // 清空数据
    Object.assign(menuData,{
        code:'',
        level:0,
        name:'',
        pid:0
    })
    showDialog.value=true
    dialogTitle.value='添加菜单'
    // 收集新增菜单的level值
    menuData.level=row.level+1
    menuData.pid=row.id
}

const EditPerssion=(row:any)=>{
    // 清空数据
    Object.assign(menuData,{
        code:'',
        level:0,
        name:'',
        pid:0
    })
    showDialog.value=true
    dialogTitle.value='编辑菜单'
    Object.assign(menuData,row)
}

const save=async()=>{
    let result:any =await reqAddOrUpdateMenu(menuData)
    if (result.code==200) {
        ElMessage({
            type:'success',
            message:menuData.id?'更新成功':'添加成功'
        })
        getAllPerssion()
        showDialog.value=false
    } else {
        ElMessage({
            type:'error',
            message:menuData.id?'更新失败':'添加失败'
        })
    }
}

const cancel=()=>{
    showDialog.value=false
}

const removeMenu=async(row:any)=>{
    let result:any=await reqRemove(row.id)
    if (result.code==200) {
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        getAllPerssion()
    } else {
        ElMessage({
            type:'error',
            message:'删除失败'
        })
    }
}
</script>

<style scoped>

</style>