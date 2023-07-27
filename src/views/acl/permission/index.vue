<template>
    <el-table border style="margin-top: 15px;" :data="allPerssion" row-key="id">
        <el-table-column label="名称" align="center" prop="name"></el-table-column>
        <el-table-column label="权限名" align="center" prop="code"></el-table-column>
        <el-table-column label="修改时间" align="center" prop="updateTime"></el-table-column>
        <el-table-column label="操作" align="center">
            <template #="{row}">
                <el-button type="success" style="margin-bottom: 5px;" @click="addMenu(row)" :disabled="row.level==4?true:false">{{ row.level==3?'添加功能':'添加菜单' }}</el-button>
                <el-button type="primary" icon="Edit" @click="EditPerssion(row)" :disabled="row.level==1?true:false">编辑</el-button>
                <el-popconfirm title="你确定要删除？" icon-color="#ec2727" @confirm="removeRole(row)">
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
                <el-input placeholder="请输入名称" ></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="roleName">
                <el-input placeholder="请输入权限名" ></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="putRoleData">确定</el-button>
            <el-button type="danger" @click="cancel">取消</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { reqAllPerssion } from '../../../api/acl/menu';
import type { PermissionResponseData} from '../../../api/acl/menu/type';

let allPerssion=ref<any>()
let showDialog=ref<boolean>(false)
let dialogTitle=ref<string>('')

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
    showDialog.value=true
    dialogTitle.value='添加菜单'
}

const EditPerssion=(row:any)=>{
    showDialog.value=true
    dialogTitle.value='编辑菜单'
}
</script>

<style scoped>

</style>