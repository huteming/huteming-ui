import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import createInstance from './createInstance'
import { RequestOptions } from './types'
import requestInterceptor from './requestInterceptor'
import formatOptions from './formatOptions'
import successInterceptor from './successInterceptor'
import errorInterceptor from './errorInterceptor'
import jsonp from 'jsonp'
import { parse, stringify } from 'qs'

export default class Request {
    readonly options: RequestOptions
    readonly instance: AxiosInstance

    constructor (options: AxiosRequestConfig = {}) {
        this.options = formatOptions(options)
        this.instance = createInstance(this.options)
        // init request Interceptor
        this.instance.interceptors.request.use(requestInterceptor.bind(this))
        // init response Interceptor
        this.instance.interceptors.response.use(successInterceptor.bind(this), errorInterceptor.bind(this))
    }

    post (url: string, data?: object, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return this.instance.post(url, data, config)
    }

    get (url: string, data?: object, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return this.instance.get(url, {
            params: data,
            ...config,
        })
    }

    /**
     * jsonp npm仓库: https://github.com/webmodules/jsonp
     */
    jsonp (url: string, params = {}, config = {}) {
        const [_url, _search] = url.split('?')
        const _query = parse(_search, { ignoreQueryPrefix: true })

        for (let key in params) {
            _query[key] = (params as any)[key]
        }

        url = [_url, '?', stringify(_query)].join('')

        return new Promise((resolve, reject) => {
            jsonp(url, config, (err: any, data: any) => {
                if (err) {
                    return reject(err)
                }

                resolve(data)
            })
        })
    }
}
