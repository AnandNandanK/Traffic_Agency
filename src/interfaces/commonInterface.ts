

export interface Common<T> {
    traceId:string ,
    statusCode: number,
    status:string ,
    timestamp:string ,
    message: string,
    data:T
}