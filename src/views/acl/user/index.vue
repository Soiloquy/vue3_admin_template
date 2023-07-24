<template>
    <el-card style="height: 80px;">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名：">
                <el-input placeholder="请输入用户名" v-model="keyWord"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="keyWord?false:true" @click="searchUser">搜索</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
        <el-button type="primary" icon="Plus" @click="addUser">添加用户</el-button>
        <el-button type="danger" icon="Delete" :disabled="seleteArr.length?false:true" @click="deleteUserList">批量删除</el-button>
        <!-- 表格 -->
        <el-table border style="margin: 10px 0;" :data="userArr" @selection-change="seleteChange">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="序号" align="center" type="index"></el-table-column>
            <el-table-column label="用户ID" align="center" prop='id'></el-table-column>
            <el-table-column label="用户名字" align="center" prop='username'></el-table-column>
            <el-table-column label="用户名称" align="center" prop='name'></el-table-column>
            <el-table-column label="用户角色" align="center" prop='roleName'></el-table-column>
            <el-table-column label="创建时间" align="center" prop='createTime'></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #="{row}">
                    <el-button type="success" icon="User" style="margin-bottom: 5px;" @click="distributeRelo(row)">分配角色</el-button>
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
            @current-change="getHasUser"
            @size-change="changePageSize"
            :page-sizes="[5,7,9]"
            :background=true
            layout="prev, pager, next, jumper,->, sizes,total"
            :total="total"
        />
    </el-card>
    <el-drawer v-model="drawer" :title="drawTitle">
        <el-form :model="userParams" :rules="rules" ref="addUserFromRef" hide-required-asterisk="false">
            <el-form-item label="用户姓名" prop="username">
                <el-input placeholder="请输入用户姓名" v-model="userParams.username"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
                <el-input placeholder="请输入用户昵称" v-model="userParams.name"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password" v-show="passwordShow">
                <el-input placeholder="请输入用户密码" type="password" v-model="userParams.password"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div style="flex:auto">
                <el-button type="primary" @click="confirm">确定</el-button>
                <el-button type="danger" @click="cancle">取消</el-button>
            </div>
        </template>
    </el-drawer>
    <!-- 分配职位 -->
    <el-drawer v-model="drawer2" title="分配职位">
        <el-form :model="userParams" hide-required-asterisk="false">
            <el-form-item label="用户姓名" prop="username">
                <el-input placeholder="请输入用户姓名" v-model="userParams.username" disabled></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox
                    v-model="checkAll"
                    :indeterminate="indeterminate"
                    @change="handleCheckAllChange"
                    >全选
                </el-checkbox>
                <el-checkbox-group v-model="assignRole" @change="handleChecked">
                    <el-checkbox v-for="role in allRole" :key="role.createTime" :label="role">{{ role.roleName }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <div style="flex:auto">
                <el-button type="primary" @click="updateRole">确定</el-button>
                <el-button type="danger" @click="cancle">取消</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref,onMounted,reactive, nextTick } from 'vue';
import { reqUserInfo,reqAddOrUpdateUser,reqAllRole,reqSetUserRole,reqDeleteListUser,reqDeleteUser } from '../../../api/acl/user/index';
import type { UserResponseData,Records,UserInfo,AllRolesResponseData,RoleData} from '../../../api/acl/user/type';
import { ElMessage } from 'element-plus';
import useLayoutSettingStore from '../../../store/modules/setting';

let currentPage=ref<number>(1)
let pageSize=ref(5)
let total=ref<number>(0)
let userArr=ref<Records>([])
let drawer=ref<boolean>(false)
let drawTitle=ref<string>('')
let userParams=reactive<UserInfo>({
    username:'',
    name:'',
    password:'',
})
let addUserFromRef=ref()
let passwordShow=ref<boolean>(true)
let drawer2=ref<boolean>(false)
let indeterminate=ref<boolean>(false)
let checkAll=ref<boolean>(false)
let allRole=ref<RoleData[]>([])
let assignRole=ref<RoleData[]>([])
let seleteArr=ref<RoleData[]>([])
let keyWord=ref<string>('')
let settingStore=useLayoutSettingStore()

const getHasUser=async(page=1)=>{
    currentPage.value=page
    let result:UserResponseData=await reqUserInfo(currentPage.value,pageSize.value,keyWord.value)
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

const addUser=()=>{
    drawTitle.value='添加用户'
    passwordShow.value=true
    drawer.value=true
    Object.assign(userParams,{
        id:null,
        username:'',
        name:'',
        password:'',
    })
    setTimeout(()=>{
        nextTick(()=>{
            addUserFromRef.value.clearValidate('username');
            addUserFromRef.value.clearValidate('name');
            addUserFromRef.value.clearValidate('password');
        })
    },120)
}

const EditUser=(row:any)=>{
    drawTitle.value='修改用户'
    passwordShow.value=false
    drawer.value=true
    Object.assign(userParams,row)
    setTimeout(()=>{
        nextTick(()=>{
            addUserFromRef.value.clearValidate('username');
            addUserFromRef.value.clearValidate('name');
            addUserFromRef.value.clearValidate('password');
        })
    },120)
}

const cancle=()=>{
    drawer.value=false
    drawer2.value=false
}

const confirm=async()=>{
    await addUserFromRef.value.validate();

    let result=await reqAddOrUpdateUser(userParams)
    if (result.code==200) {
        drawer.value=false
        ElMessage({
            type:'success',
            message:userParams.id?'更新成功':'添加成功'
        })
        getHasUser(userParams.id?currentPage.value:1)
        // window.location.reload()
    }else{
        ElMessage({
            type:'error',
            message:userParams.id?'更新失败':'添加失败'
        })
    }
}

// 自定义校验规则
const validatorUserName = (_:any,value:any,callback:any) => {
    // rule校验规则对象  value表单元素文本内容 
    // callback：符合条件通过，不符合则注入错误提示信息
    if (!value) {
        return callback(new Error('用户名不能为空'))
    }
    if (value.length>=5) {
        callback();
    }else{
        callback(new Error('账号长度至少5位'))
    }
}
const validatorPassword=(_:any,value:any,callback:any)=>{
    if (!value) {
        return callback(new Error('密码不能为空'))
    }
    if (/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,32}$/.test(value)) {
        callback()
    }else{
        callback(new Error("密码必须由字母、数字组成,密码长度为8-32位"))
    }
}

const rules={
    username:[
        { required: true, message: '请输入用户姓名', trigger: 'blur' },
        { min: 1, message: '请输入用户姓名', trigger: 'blur' },
    ],
    name:[
        {trigger:'change',validator: validatorUserName}
    ],
    password:[
        {trigger:'change',validator:validatorPassword}
    ]
}

const distributeRelo=async(row:any)=>{
    Object.assign(userParams,row)
    let result:AllRolesResponseData=await reqAllRole(row.id)
    if (result.code==200) {
        allRole.value=result.data.allRolesList
        assignRole.value=result.data.assignRoles
        if (assignRole.value.length!=0) {
            indeterminate.value=true
        }else{
            indeterminate.value=false
        }
        drawer2.value=true
    }else{
        ElMessage({
            type:'error',
            message:'获取信息失败'
        })
    }
}

const handleCheckAllChange=(val:boolean)=>{
    assignRole.value= val?allRole.value:[]
    indeterminate.value=false
}

const handleChecked=(value:string[])=>{
    checkAll.value=value.length===allRole.value.length
    if (value.length!=0&&value.length!==allRole.value.length) {
        indeterminate.value=true
    }else{
        indeterminate.value=false
    }
}

const updateRole=async()=>{
    let data:any={
        userId:userParams.id,
        roleIdList:assignRole.value.map(item=>item.id)
    }
    let result=await reqSetUserRole(data)
    if (result.code==200) {
        ElMessage({
            type:'success',
            message:'更新成功'
        })
        drawer2.value=false
        getHasUser(currentPage.value)
    }else{
        ElMessage({
            type:'error',
            message:'更新失败'
        })
    }
}

const DeleteUser=async(row:any)=>{
    let result = await reqDeleteUser(row.id)
    if (result.code==200) {
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        getHasUser(currentPage.value)
    }else{
        ElMessage({
            type:'error',
            message:'删除失败'
        })
    }
}

const seleteChange=(value:any)=>{
    seleteArr.value=value
}

const deleteUserList=async()=>{
    let useridList=seleteArr.value.map(item=>item.id)
    let result=await reqDeleteListUser((useridList as number[]))
    if (result.code==200) {
        ElMessage({
            type:'success',
            message:'批量删除成功'
        })
        getHasUser(currentPage.value)
    }else{
        ElMessage({
            type:'error',
            message:'批量删除失败'
        })
    }
}

const searchUser=()=>{
    getHasUser()
    keyWord.value=''
}

const reset=()=>{
    settingStore.refresh=!settingStore.refresh
}
</script>

<style scoped>
.form{
    display: flex;
    justify-content: space-between;
}
</style>