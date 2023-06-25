// 统一管理商品属性相关的接口
import request from "../../../../../utils/request"
import type { CategoryResponseData,AttrResponseData,Attr } from "./type"

enum API{
    C1_URL='/admin/product/getCategory1',
    C2_URL='/admin/product/getCategory2/',
    C3_URL='/admin/product/getCategory3/',
    // 获取分类的属性和属性值
    ATTR_URL='/admin/product/attrInfoList/',
    // 添加或新增属性
    ADDANDUPDATE_URL='/admin/product/saveAttrInfo'
}

export const reqC1=()=>request.get<any,CategoryResponseData>(API.C1_URL)

export const reqC2=(getCategory1Id:number|string)=>
request.get<any,CategoryResponseData>(API.C2_URL+getCategory1Id)

export const reqC3=(getCategory2Id:number|string)=>
request.get<any,CategoryResponseData>(API.C3_URL+getCategory2Id)

export const reqGetAttr=(getCategory1Id:number|string,getCategory2Id:number|string,getCategory3Id:number|string)=>
request.get<any,AttrResponseData>(API.ATTR_URL+`${getCategory1Id}/${getCategory2Id}/${getCategory3Id}`)

export const reqAddAndUpdate=(data:Attr)=>
request.post<any,any>(API.ADDANDUPDATE_URL,data)