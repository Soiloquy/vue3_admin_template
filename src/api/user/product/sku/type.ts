import type { ResponseData } from "../spu/type";

// 定义SKU对象
export interface AttrValue{
    attrId?:string|number,
    valueId?:string|number
}

export interface SaleAttrValueSku{
    saleAttrId?:string|number,
    saleAttrValueId?:string|number
}

export interface SkuData{
    category3Id:string|number,
    spuId:string|number,
    tmId:string|number,
    skuName:string,
    price:string|number,
    weight:string|number,
    skuDesc:string,
    skuAttrValueList:AttrValue[],
    skuSaleAttrValueList:SaleAttrValueSku[],
    skuDefaultImg:string
}

export interface SkuResponseData extends ResponseData{
    data:{
        records:SkuData[],
        total:number,
        size:number,
        current:number,
        optimizeCountSql:boolean,
        hitCount:boolean
        page:number,
        searchCount:boolean
    }
}