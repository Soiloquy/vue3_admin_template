// 用户管理模块
import requset from "../../../utils/request";
import type { UserResponseData,UserInfo } from "./type";

enum API{
    // 获取全部用户
    GETALLUSER_URL='admin/acl/user/',
    // 添加和修改用户
    ADDUSER_URL='admin/acl/user/save',
    UPDATEUSER_URL='admin/acl/user/update'
}

export const reqUserInfo=(page:number,limit:number)=>
requset.get<any,UserResponseData>(API.GETALLUSER_URL+`${page}/${limit}`)

export const reqAddOrUpdateUser=(userInfo:UserInfo)=>{
    if (userInfo.id) {
        return requset.put<any,any>(API.UPDATEUSER_URL,userInfo)
    }else{
        return requset.post<any,any>(API.ADDUSER_URL,userInfo)
    }
}