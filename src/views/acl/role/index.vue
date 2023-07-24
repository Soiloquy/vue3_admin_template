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
        <el-button type="primary" icon="Plus" @click="addUser">添加职位</el-button>
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
                    <el-button type="primary" icon="Edit" @click="EditUser(row)">编辑</el-button>
                    <el-popconfirm title="你确定要删除？" icon-color="#ec2727" @confirm="DeleteUser(row)">
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
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import {reqAllRoleList} from '../../../api/acl/role/index'
import type { RoleResponseData,RoleData } from '../../../api/acl/role/style';
import useLayoutSettingStore from '../../../store/modules/setting';

let currentPage=ref<number>(1)
let pageSize=ref(5)
let total=ref<number>(0)
let roleArr=ref<RoleData[]>([])
let keyWord=ref<string>('')
let settingStore=useLayoutSettingStore()

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
</script>

<style scoped lang="scss">
.form{
    display: flex;
    justify-content: space-between;
}
</style>