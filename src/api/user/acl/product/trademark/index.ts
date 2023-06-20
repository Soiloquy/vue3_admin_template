// 品牌管理模块接口
import requset from "../../../../../utils/request";
import type { TradeMarkResponseData,TradeMark } from "./type";

// 接口地址
enum API{
    TRADEMARK_URL="/admin/product/baseTrademark/",
    ADDTRADEMARK_URL="/admin/product/baseTrademark/save",
    UPDATETRADEMARK_URL="/admin/product/baseTrademark/update",
    DELETE_URL='/admin/product/baseTrademark/remove/'
}

export const reqHasTrademark=(page:number,limit:number)=>
requset.get<any,TradeMarkResponseData>(API.TRADEMARK_URL+`${page}/${limit}`)

export const reqAddOrUpdateTrademark=(data:TradeMark)=>{
    if (data.id) {
        return requset.put<any,any>(API.UPDATETRADEMARK_URL,data)
    }else{
        return requset.post<any,any>(API.ADDTRADEMARK_URL,data)
    }
}

export const reqDeleteTrademark=(id:number)=>requset.delete<any,any>(API.DELETE_URL+id)
