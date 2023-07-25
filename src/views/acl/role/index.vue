<template>
    <el-card style="height: 80px;">
        <el-form :inline="true" class="form">
            <el-form-item label="角色名：">
                <el-input placeholder="请输入角色名" v-model="keyWord"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="keyWord?false:true" @click="searchUser">搜索</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
        <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
        <!-- 表格 -->
        <el-table border style="margin: 10px 0;" :data="roleArr">
            <el-table-column label="序号" align="center" type="index"></el-table-column>
            <el-table-column label="职位ID" align="center" prop='id'></el-table-column>
            <el-table-column label="用户名称" align="center" prop='roleName'></el-table-column>
            <el-table-column label="创建时间" align="center" prop='createTime'></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #="{row}">
                    <el-button type="success" icon="User" style="margin-bottom: 5px;" @click="distributeRelo(row)">分配权限</el-button>
                    <el-button type="primary" icon="Edit" @click="EditRole(row)">编辑</el-button>
                    <el-popconfirm title="你确定要删除？" icon-color="#ec2727" @confirm="">
                        <template #reference>
                            <el-button type="danger" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            @current-change="getHasRole"
            @size-change="changePageSize"
            :page-sizes="[5,7,9]"
            :background=true
            layout="prev, pager, next, jumper,->, sizes,total"
            :total="total"
        />
    </el-card>
    <!-- 添加和更新已有的职位 -->
    <el-dialog v-model="showDialog" :title="roleDate?.id?'更新职位':'添加职位'">
        <el-form :model="roleDate" :rules="rules" hide-required-asterisk="false" ref="form">
            <el-form-item label="职位名称" prop="roleName">
                <el-input placeholder="请输入职位名称" v-model="roleDate.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="putRoleData">确定</el-button>
            <el-button type="danger" @click="cancel">取消</el-button>
        </template>
    </el-dialog>
    <!-- 分配权限 -->
    <el-drawer v-model="drawer" title="分配权限">
        <el-tree
            :props="props"
            :data="menuArr"
            default-expand-all
            show-checkbox
            :default-checked-keys="[]"
        />
        <template #footer>
            <div style="flex:auto">
                <el-button type="primary" @click="">确定</el-button>
                <el-button type="danger" @click="drawer=false">取消</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref,onMounted,reactive,nextTick } from 'vue';
import {reqAllRoleList,reqAddOrUpdateRole,reqAllRermission} from '../../../api/acl/role/index'
import type { RoleResponseData,RoleData,MenuData,MenuResponseData } from '../../../api/acl/role/style';
import useLayoutSettingStore from '../../../store/modules/setting';
import { ElMessage } from 'element-plus';

let currentPage=ref<number>(1)
let pageSize=ref(5)
let total=ref<number>(0)
let roleArr=ref<RoleData[]>([])
let keyWord=ref<string>('')
let settingStore=useLayoutSettingStore()
let roleDate=reactive<RoleData>({
    roleName:''
})
let showDialog=ref<boolean>(false)
let form=ref()
let drawer=ref<boolean>(false)
let menuArr=ref<MenuData[]>([])

const getHasRole=async(page=1)=>{
    currentPage.value=page
    let result:RoleResponseData=await reqAllRoleList(currentPage.value,pageSize.value,keyWord.value)
    if (result.code==200) {
        total.value=result.data.total
        roleArr.value=result.data.records
    }
}
onMounted(async()=>{
    getHasRole()
})

const changePageSize=()=>{
    getHasRole()
}

const searchUser=()=>{
    getHasRole()
    keyWord.value=''
}

const reset=()=>{
    settingStore.refresh=!settingStore.refresh
}

const addRole=()=>{
    Object.assign(roleDate,{
        roleName:'',
        id:''
    })
    showDialog.value=true
    nextTick(()=>{
        form.value.clearValidate('roleName')
    })
}

const cancel=()=>{
    showDialog.value=false
}

const EditRole=(row:any)=>{
    showDialog.value=true
    Object.assign(roleDate,row)
    nextTick(()=>{
        form.value.clearValidate('roleName')
    })
}

const putRoleData=async()=>{
    await form.value.validate()
    let result= await reqAddOrUpdateRole(roleDate)
    if (result.code==200) {
        ElMessage({
            type:'success',
            message:roleDate.id?'更新成功':'添加成功'
        })
        showDialog.value=false
        getHasRole(roleDate.id?currentPage.value:1)
    } else {
        ElMessage({
            type:'error',
            message:roleDate.id?'更新失败':'添加失败'
        })
    }
}

// 校验规则
const rules={
    roleName:[
        { required: true, message: '请输入职位名称', trigger: 'blur' },
        { min: 1, message: '请输入职位名称', trigger: 'blur' },
    ]
}

const distributeRelo=async(row:any)=>{
    drawer.value=true
    let result:MenuResponseData=await reqAllRermission(row.id)
    if (result.code==200) {
        menuArr.value=result.data
    }
}

const props={
    children:'children',
    label:'name'
}
</script>

<style scoped lang="scss">
.form{
    display: flex;
    justify-content: space-between;
}
</style>