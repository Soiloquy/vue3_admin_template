import type { RouteRecordRaw } from "vue-router"
import type { CategoryObj } from "../../../api/user/acl/product/attr/type"
// 定义小仓库数据state类型
export interface UserState{
    token:string|null
    menuRoutes:RouteRecordRaw[],
    username:string,
    avatar:string
}

// 定义分类仓库state对象的类型
export interface CategoryState{
    c1Id:string|number,
    c1Arr:CategoryObj[]
}