// 用户管理模块
import requset from "../../../utils/request";
import type { UserResponseData } from "./type";

enum API{
    // 获取全部用户
    GETALLUSER_URL='admin/acl/user/',
}

export const reqUserInfo=(page:number,limit:number)=>
requset.get<any,UserResponseData>(API.GETALLUSER_URL+`${page}/${limit}`)