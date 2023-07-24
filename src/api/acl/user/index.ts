// 用户管理模块
import requset from "../../../utils/request";
import type { UserResponseData,UserInfo,AllRolesResponseData,SetRole } from "./type";

enum API{
    // 获取全部用户
    GETALLUSER_URL='admin/acl/user/',
    // 添加和修改用户
    ADDUSER_URL='admin/acl/user/save',
    UPDATEUSER_URL='admin/acl/user/update',
    // 获取全部职位和拥有的职位
    ALLROLE_URL='admin/acl/user/toAssign/',
    // 提交职位
    SETROLE_URL='admin/acl/user/doAssignRole',
    // 删除一个账号
    DELETEUSER_URL='admin/acl/user/remove/',
    // 批量删除
    DELETELISTUSER_URL='admin/acl/user/batchRemove'
}

export const reqUserInfo=(page:number,limit:number,username?:string)=>
requset.get<any,UserResponseData>(API.GETALLUSER_URL+`${page}/${limit}/?username=${username}`)

export const reqAddOrUpdateUser=(userInfo:UserInfo)=>{
    if (userInfo.id) {
        return requset.put<any,any>(API.UPDATEUSER_URL,userInfo)
    }else{
        return requset.post<any,any>(API.ADDUSER_URL,userInfo)
    }
}

export const reqAllRole=(userId:number)=>
requset.get<any,AllRolesResponseData>(API.ALLROLE_URL+userId)

export const reqSetUserRole=(data:SetRole)=>
requset.post<any,any>(API.SETROLE_URL,data)

export const reqDeleteUser=(userId:number)=>
requset.delete<any,any>(API.DELETEUSER_URL+userId)

export const reqDeleteListUser=(useridList:number[])=>
requset.delete<any,any>(API.DELETELISTUSER_URL,{data:useridList})