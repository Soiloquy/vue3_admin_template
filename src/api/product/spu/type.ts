import type{ TradeMark } from "../trademark/type"
export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}

//SPU数据的ts类型
export interface SpuData{
    id?:number,
    spuName:string,
    description:string,
    category3Id:string|number,
    tmId:number|string,
    spuSaleAttrList:null|SaleAttr[],
    spuImageList:null|SpuImg[]
}

export type Records=SpuData[]

export interface HasSpuResponseData extends ResponseData{
    data:{
        records:Records,
        total:number,
        size:number,
        current:number,
        searchCount:boolean,
        pages:number
    }
}

export interface TradeMarkDates extends ResponseData{
    data:TradeMark[]
}

// 商品图片
export interface SpuImg{
    id?:number,
    createTime:string,
    updateTime:string,
    spuId?:number,
    imgName?:string,
    imgUrl?:string,
    name?:string,
    url?:string
}

export interface AllSpuImg extends ResponseData{
    data:SpuImg[]
}

// 销售属性
export interface SaleAttrValue{
    id?:number,
    createTime:null,
    updateTime:null,
    spuId:number,
    baseSaleAttrId:number,
    saleAttrValueName:string,
    saleAttrName:string,
    isChecked:null
}

export interface SaleAttr{
    id?:number,
    createTime?:null,
    updateTime?:null,
    spuId?:number,
    baseSaleAttrId:number|string,
    saleAttrName:string,
    spuSaleAttrValueList:SaleAttrValue[]
}

export interface ResponseSaleAttr extends ResponseData{
    data:SaleAttr[]
}

// 全部的销售属性
export interface BaseSaleAttr{
    id?:number,
    name:string
}

export interface AllBaseSaleAttr extends ResponseData{
    data:BaseSaleAttr[]
}

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

export interface SkuInfoData extends ResponseData{
    data:SkuData[]
}