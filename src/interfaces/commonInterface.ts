


export interface Common<T> {
    traceId:string ,
    statusCode: number,
    status:string ,
    timestamp:string ,
    message: string,
    data:PageData<T>
}


export type PageData<T>={
    list:T,
    totalElements:number
}

export interface WithoutPagination<T> {
    traceId:string ,
    statusCode: number,
    status:string ,
    timestamp:string ,
    message: string,
    data:T
}
