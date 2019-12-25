import { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios'

export class Request {
    readonly options: RequestOptions
    readonly instance: AxiosInstance
    get: Function
    post: Function
    jsonp: Function
}

export interface RequestOptions extends AxiosRequestConfig {
    // 页面未登录重定向配置
    jhsyAccountAlias: string
    // 重发请求
    jhsyRetry: number
    jhsyRetryDelay: number
    jhsyRetryCount: number
}

export interface RequestError extends AxiosError {
    config: RequestOptions
}

export interface JSONPResponse {
    result: any
}
