export interface ResponseData{
    code:number,
    message:string,
    ok:string
}

// 品牌的ts类型
export interface TradeMark{
    id?:number,
    tmName:string,
    logoUrl:string
}

// 全部品牌数据的ts类型
export type Records=TradeMark[]

// 获取的全部品牌的数据类型
export interface TradeMarkResponseData extends ResponseData{
    data:{
        records:Records,
        total:number,
        size:number,
        current:number,
        searchCount:boolean,
        pages:number
    }
}