// 统一管理商品SPU相关的接口
import request from "../../../../utils/request"
import type { SkuResponseData } from "./type"

enum API{
    // 获取已有的商品数据SKU
    SKU_URL='admin/product/list/',
    // 下架
    CANCELSALE_URL='admin/product/cancelSale/',
    // 上架
    SALE_URL='admin/product/onSale/'
}

export const reqSkuList=(page:number,limit:number)=>
request.get<any,SkuResponseData>(API.SKU_URL+`${page}/${limit}`)

export const reqSaleSku=(skuId:number)=>
request.get<any,any>(API.SALE_URL+skuId)

export const reqCancelSaleSku=(skuId:number)=>
request.get<any,any>(API.CANCELSALE_URL+skuId)