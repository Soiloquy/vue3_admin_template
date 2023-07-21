<template>
    <el-card style="height: 80px;">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名：">
                <el-input placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button type="primary">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
        <el-button type="primary" icon="Plus">添加用户</el-button>
        <el-button type="danger" icon="Delete">批量删除</el-button>
        <!-- 表格 -->
        <el-table border style="margin: 10px 0;" :data="userArr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="序号" align="center" type="index"></el-table-column>
            <el-table-column label="用户ID" align="center" prop='id'></el-table-column>
            <el-table-column label="用户名字" align="center" prop='username'></el-table-column>
            <el-table-column label="用户名称" align="center" prop='name'></el-table-column>
            <el-table-column label="用户角色" align="center" prop='roleName'></el-table-column>
            <el-table-column label="创建时间" align="center" prop='createTime'></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #="{}">
                    <el-button type="success" icon="User" style="margin-bottom: 5px;">分配角色</el-button>
                    <el-button type="primary" icon="Edit">编辑</el-button>
                    <el-button type="danger" icon="Delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            @current-change="getHasUser"
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
import { reqUserInfo } from '../../../api/acl/user/index';
import type { UserResponseData,Records } from '../../../api/acl/user/type';

let currentPage=ref<number>(1)
let pageSize=ref(5)
let total=ref<number>(0)
let userArr=ref<Records>([])

const getHasUser=async(page=1)=>{
    currentPage.value=page
    let result:UserResponseData=await reqUserInfo(currentPage.value,pageSize.value)
    if (result.code==200) {
        total.value=result.data.total
        userArr.value=result.data.records
    }
}
onMounted(async()=>{
    getHasUser()
})

const changePageSize=()=>{
    getHasUser()
}
</script>

<style scoped>
.form{
    display: flex;
    justify-content: space-between;
}
</style>