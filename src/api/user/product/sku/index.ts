// 统一管理商品SPU相关的接口
import request from "../../../../utils/request"
import type { SkuResponseData,SkuInfoData } from "./type"

enum API{
    // 获取已有的商品数据SKU
    SKU_URL='admin/product/list/',
    // 下架
    CANCELSALE_URL='admin/product/cancelSale/',
    // 上架
    SALE_URL='admin/product/onSale/',
    // 获取商品详情
    SKUINFO_URL='admin/product/getSkuInfo/',
    // 删除商品
    DELETESKU_URL='admin/product/deleteSku/'
}

export const reqSkuList=(page:number,limit:number)=>
request.get<any,SkuResponseData>(API.SKU_URL+`${page}/${limit}`)

export const reqSaleSku=(skuId:number)=>
request.get<any,any>(API.SALE_URL+skuId)

export const reqCancelSaleSku=(skuId:number)=>
request.get<any,any>(API.CANCELSALE_URL+skuId)

export const reqGetSkuInfo=(skuId:number)=>
request.get<any,SkuInfoData>(API.SKUINFO_URL+skuId)

export const reqDeleteSku=(skuId:number)=>
request.delete<any,any>(API.DELETESKU_URL+skuId)