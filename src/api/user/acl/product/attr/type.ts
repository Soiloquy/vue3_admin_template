export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}

export interface CategoryObj{
    id:number|string,
    name:string,
    category1Id?:number,
    category2Id?:number
}

export interface CategoryResponseData extends ResponseData{
    data:CategoryObj[]
}

// 属性与属性值的ts类型

// 属性值对象的ts类型
export interface AttrValue{
    id:number,
    valueName:string,
    attrId:number
}

export type AttrValueList=AttrValue[]

// 属性对象的ts类型
export interface Attr{
    id:number,
    attrName:string,
    categoryId:number,
    categoryLevel:number,
    attrValueList:AttrValueList
}

export type AttrList=Attr[]

// 属性接口返回的数据类型
export interface AttrResponseData extends ResponseData{
    data:Attr[]
}