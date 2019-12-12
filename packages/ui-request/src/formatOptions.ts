import { RequestOptions } from '../types'
import { AxiosRequestConfig } from 'axios'
import { isStandardBrowserEnv } from '@huteming/ui-tools/src/main'

const mapHost = new Map([
    ['fejh.jinghao.com', '//jhtest.jinghao.com'],
    ['fejhdemo.jinghao.com', '//jhdemo.jinghao.com'],
    ['jhsy.jinghao.com', '//api.jinghao.com'],
    ['tommy.jinghao.com', '//api.jinghao.com']
])
const host = isStandardBrowserEnv() ? window.location.host : ''

const defaults = {
    baseURL: mapHost.get(host) || '//jhtest.jinghao.com',
    timeout: 8000,
    withCredentials: true,
    jhsyAccountAlias: '',
    jhsyRetry: 2,
    jhsyRetryDelay: 1000,
    jhsyRetryCount: 0,
}
const defaultHeaders = {
    // 'Content-Type': 'application/x-www-form-urlencoded',
}

export default function (options: AxiosRequestConfig): RequestOptions {
    const _options: RequestOptions = Object.assign({}, defaults, {
        headers: Object.assign({}, defaultHeaders, options.headers),
    })

    return _options
}
