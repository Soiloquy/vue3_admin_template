// 统一管理商品SPU相关的接口
import request from "../../../utils/request"
import {SpuData, HasSpuResponseData,TradeMarkDates,AllSpuImg,ResponseSaleAttr,AllBaseSaleAttr,SkuData, SkuInfoData } from "./type"

enum API{
    GETSPU_URL="/admin/product/",
    // 获取全部品牌的数据
    ALLTRADEMARK_URL='/admin/product/baseTrademark/getTrademarkList',
    // 获取图片
    GETSPUIMAGE_URL='/admin/product/spuImageList/',
    // 获取销售属性
    GETSALEATTR_URL='/admin/product/spuSaleAttrList/',
    // 获取全部的销售属性
    BASESALEATTR_URL='/admin/product/baseSaleAttrList',
    // 追加一个新的SPU
    ADDSPU_URL='/admin/product/saveSpuInfo',
    // 更新已有的SPU
    UPDATESPU_URL='/admin/product/updateSpuInfo',
    // 追加一个新增的SKU地址
    ADDSKU_URL='/admin/product/saveSkuInfo',
    // 查看某个SPU下的全部售卖的商品
    SKUINFO_URL='admin/product/findBySpuId/',
    // 删除SPU
    DELETESPU_URL='admin/product/deleteSpu/'
}

export const reqGetSpu=(page:number,limit:number,category3Id:string|number)=>
request.get<any,HasSpuResponseData>(API.GETSPU_URL+`${page}/${limit}?category3Id=${category3Id}`)

export const reqAllTrademark=()=>
request.get<any,TradeMarkDates>(API.ALLTRADEMARK_URL)

export const reqGetSpuImage=(spuId:number)=>
request.get<any,AllSpuImg>(API.GETSPUIMAGE_URL+spuId)

export const reqSaleAttr=(spuId:number)=>
request.get<any,ResponseSaleAttr>(API.GETSALEATTR_URL+spuId)

export const reqBaseSaleAttr=()=>
request.get<any,AllBaseSaleAttr>(API.BASESALEATTR_URL)

export const reqAddSpuOrUpdate=(data:SpuData)=>{
    if (data.id) {
        return request.post<any,any>(API.UPDATESPU_URL,data)
    } else {
        return request.post<any,any>(API.ADDSPU_URL,data)
    }
}

export const reqAddSku=(data:SkuData)=>
request.post<any,any>(API.ADDSKU_URL,data)

export const reqSkuInfo=(spuId:any)=>
request.get<any,SkuInfoData>(API.SKUINFO_URL+spuId)

export const reqDeleteSku=(spuId:string|number)=>
request.delete<any,any>(API.DELETESPU_URL+spuId)