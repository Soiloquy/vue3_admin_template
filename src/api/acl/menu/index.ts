import requset from "../../../utils/request";
import type { PermissionResponseData } from "./type";

enum API{
    // 获取全部菜单数据
    ALLPERMISSION_URL='/admin/acl/permission'
}

export const reqAllPerssion=()=>
requset.get<any,PermissionResponseData>(API.ALLPERMISSION_URL)