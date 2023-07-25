import requset from "../../../utils/request";
import type { RoleResponseData,RoleData,MenuResponseData } from "./style";

enum API{
    // 获取全部职位
    ALLROLE_URL='admin/acl/role/',
    // 添加职位
    ADDROLE_URL='admin/acl/role/save',
    UPDATEDROLE_URL='admin/acl/role/update',
    // 获取全部权限数据
    ALLPERMISSION_URL='admin/acl/permission/toAssign/'
}

export const reqAllRoleList=(page:number,limit:number,roleName:string)=>
requset.get<any,RoleResponseData>(API.ALLROLE_URL+`${page}/${limit}?roleName=${roleName}`)

export const reqAddOrUpdateRole=(data:RoleData)=>{
    if (data.id) {
        return requset.put<any,any>(API.UPDATEDROLE_URL,data)
    } else {
        return requset.put<any,any>(API.ADDROLE_URL,data)
    }
}

export const reqAllRermission=(roleId:number)=>
requset.get<any,MenuResponseData>(API.ALLPERMISSION_URL+roleId)