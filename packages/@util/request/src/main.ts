import axios from 'axios'
import qs from 'qs'
import Interceptor from './interceptors'
import { requestJsonp, requestGet } from './expand'
import { jsonToForm } from 'web-util/tool/src/main'

const mapHost = new Map([
    ['fejh.jinghao.com', '//jhtest.jinghao.com'],
    ['fejhdemo.jinghao.com', '//jhdemo.jinghao.com'],
    ['jhsy.jinghao.com', '//api.jinghao.com'],
    ['tommy.jinghao.com', '//api.jinghao.com']
])

const defaults = {
    baseURL: mapHost.get(window.location.host) || '//jhtest.jinghao.com',
    timeout: 8000,
    withCredentials: true,
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    // 自定义配置，非 axios 官方
    // 请求拦截器: _reqSuccess
    // 响应拦截器: _resSuccess, _resError
    // 页面未登录重定向配置
    _accountAlias: '',
    // 重发请求
    _retry: 2,
    _retryDelay: 1000,
}

function createInstance (options: any = {}) {
    // headers
    options.headers = Object.assign({}, defaults.headers, options.headers || {})

    // 覆盖其他选项
    options = Object.assign({}, defaults, options)

    const instance: any = axios.create(options)
    const _interceptor = new Interceptor(options, instance)

    // 添加请求拦截器
    // 暂时只处理 data(post 请求数据体)，并修改对应 headers
    instance.interceptors.request.use(function (config: any) {
        // 在发送请求之前做些什么
        if (typeof options._reqSuccess === 'function') {
            options._reqSuccess(config)
        }

        const data = config.data

        // 数据体不存在
        if (!data) {
            return config
        }

        // string 无需转换
        if (typeof data === 'string') {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            return config
        }

        // formData 无需转换
        if (data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data'
            return config
        }

        // json => string
        if (!data._type || data._type === 'string') {
            delete data._type

            config.data = qs.stringify(data)
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

            return config
        }

        // json 不转换
        if (data._type === 'json') {
            delete data._type

            config.headers['Content-Type'] = 'application/json'

            return config
        }

        // json => formData
        if (data._type === 'form') {
            delete data._type

            config.data = jsonToForm(data)
            config.headers['Content-Type'] = 'multipart/form-data'

            return config
        }

        return config
    })

    // 添加响应拦截器
    instance.interceptors.response.use(function (res: any) {
        if (typeof options._resSuccess === 'function') {
            options._resSuccess(res)
        }
        return _interceptor.resSuccess(res)
    }, function (err: any) {
        if (typeof options._resError === 'function') {
            options._resError(err)
        }
        return _interceptor.resError(err)
    })

    instance.jsonp = requestJsonp
    instance.find = requestGet(instance.get)

    return instance
}

export default (function () {
    let _instance: any = null

    return function (options?: any) {
        if (!_instance || options) {
            _instance = createInstance(options)
        }

        return _instance
    }
})()
