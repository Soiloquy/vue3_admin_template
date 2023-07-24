export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}

// 一个用户账号的信息
export interface UserInfo{
    id?:number,
    createTime?:string,
    UpdateTime?:string,
    username:string,
    password?:string,
    name:string,
    phone?:null,
    roleName?:string
}

export type Records=UserInfo[]

export interface UserResponseData extends ResponseData{
    data:{
        records:Records,
        total:number,
        size:number,
        current:number,
        order:[],
        optimizeCountSql:boolean,
        hitCount:boolean,
        countId:null,
        maxLimit:null,
        searchCount:boolean,
        pages:number
    }
}
// 职位ts类型
export interface RoleData{
    id?:number,
    createTime?:string,
    UpdateTime?:string,
    roleName:string,
    remark:null
}

export interface AllRolesResponseData extends ResponseData{
    data:{
        assignRoles:RoleData[],
        allRolesList:RoleData[]
    }
}

// 分配职位
export interface SetRole{
    roleIdList:number[],
    userId:number
}