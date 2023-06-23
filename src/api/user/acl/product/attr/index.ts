// 统一管理商品属性相关的接口
import request from "../../../../../utils/request"
import type { CategoryResponseData } from "./type"

enum API{
    C1_URL='/admin/product/getCategory1',
    C2_URL='/admin/product/getCategory2/',
    C3_URL='/admin/product/getCategory3/'
}

export const reqC1=()=>request.get<any,CategoryResponseData>(API.C1_URL)
export const reqC2=(getCategory1Id:number)=>request.get<any,CategoryResponseData>(API.C2_URL+getCategory1Id)
export const reqC3=(getCategory2Id:number)=>request.get<any,CategoryResponseData>(API.C3_URL+getCategory2Id)