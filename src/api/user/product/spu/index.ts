// 统一管理商品SPU相关的接口
import request from "../../../../utils/request"
import { HasSpuResponseData } from "./type"

enum API{
    GETSPU_URL="admin/product/"
}

export const reqGetSpu=(page:number,limit:number,category3Id:string|number)=>
request.get<any,HasSpuResponseData>(API.GETSPU_URL+`${page}/${limit}?category3Id=${category3Id}`)