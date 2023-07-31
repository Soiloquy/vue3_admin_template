import requset from "../../../utils/request";
import type { PermissionResponseData,MenuParams } from "./type";

enum API{
    // 获取全部菜单数据
    ALLPERMISSION_URL='/admin/acl/permission',
    // 新增菜单
    ADDPERMISSION_URL='/admin/acl/permission/save',
    // 更新
    UPDATE_URL='/admin/acl/permission/update',
    // 删除
    REMOVE_URL='/admin/acl/permission/remove/'
}

export const reqAllPerssion=()=>
requset.get<any,PermissionResponseData>(API.ALLPERMISSION_URL)

export const reqAddOrUpdateMenu=(data:MenuParams)=>{
    if (data.id) {
        return requset.put(API.UPDATE_URL,data)
    } else {
        return requset.post(API.ADDPERMISSION_URL,data)
    }
}

export const reqRemove=(id:number)=>
requset.delete(API.REMOVE_URL+id)