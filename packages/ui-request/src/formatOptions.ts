import { RequestOptions } from '../types'
import { AxiosRequestConfig } from 'axios'
import { isStandardBrowserEnv } from '@huteming/ui-tools/src/main'

const mapHost = new Map([
    ['fejh.jinghao.com', '//jhtest.jinghao.com'],
    ['fejhdemo.jinghao.com', '//jhdemo.jinghao.com'],
    ['jhsy.jinghao.com', '//api.jinghao.com'],
    ['tommy.jinghao.com', '//api.jinghao.com']
])

const defaults = {
    baseURL: '',
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
    const _options: RequestOptions = Object.assign({}, defaults, options, {
        headers: Object.assign({}, defaultHeaders, options.headers),
    })
    /* istanbul ignore else */
    if (!_options.baseURL && isStandardBrowserEnv()) {
        _options.baseURL = mapHost.get(window.location.host) || '//jhtest.jinghao.com'
    }

    return _options
}
