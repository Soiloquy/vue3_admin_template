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
    tmId:number,
    spuSaleAttrList:null,
    spuImageList:null
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
    id:number,
    createTime:string,
    updateTime:string,
    spuId:number,
    imgName:string,
    imgUrl:string
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
    createTime:null,
    updateTime:null,
    spuId:number,
    baseSaleAttrId:number,
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