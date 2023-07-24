import requset from "../../../utils/request";
import type { RoleResponseData } from "./style";

enum API{
    // 获取全部职位
    ALLROLE_URL='admin/acl/role/'
}

export const reqAllRoleList=(page:number,limit:number,roleName:string)=>
requset.get<any,RoleResponseData>(API.ALLROLE_URL+`${page}/${limit}?roleName=${roleName}`)