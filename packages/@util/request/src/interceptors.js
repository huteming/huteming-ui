import { CustomError } from './custom_error'
import axios from 'axios'

const mapHost = new Map([
    ['fejh.jinghao.com', '//r1001.jinghao.com'],
    ['fejhdemo.jinghao.com', '//api.jinghao.com'],
    ['jhsy.jinghao.com', '//api.jinghao.com'],
    ['tommy.jinghao.com', '//api.jinghao.com']
])

export default class Interceptor {
    constructor (options = {}, instance) {
        this._options = options
        this._instance = instance

        this._mapErrorHandler = new Map([
            [-100, this._unLogin.bind(this)], // 未登录
            [-1, this._notifier.bind(this)], // 消息类错误
        ])
    }

    async resSuccess (res) {
        const { flag, hash } = res.data

        // 七牛上传
        if (res.config && res.config.url.indexOf('up.qbox.me') > -1) {
            if (!hash) {
                const _log = typeof window.definedPrompt === 'function' ? window.definedPrompt : console.error
                _log('上传失败，刷新页面后重新上传', null, { cancelFlag: 'hide' })
                return Promise.reject(res)
            }
            return res
        }

        // 正常返回
        if (flag === 1) {
            return res
        }

        // 页面错误处理
        const handler = this._mapErrorHandler.get(flag) || function () {}
        const _customError = handler(res, this._options)
        this._final()

        return Promise.reject(_customError || res)
    }

    async resError (err) {
        const config = err.config

        if (err.message === 'Network Error') {
            return Promise.reject(err)
        }

        if (axios.isCancel(err)) {
            return Promise.reject(new CustomError('请求取消'))
        }

        if (!config) {
            return Promise.reject(err)
        }

        config.__retryCount = config.__retryCount || 0

        if (config.__retryCount >= config._retry) {
            return Promise.reject(err)
        }

        config.__retryCount += 1

        await new Promise((resolve, reject) => setTimeout(resolve, config._retryDelay))

        return this._instance(config)
    }

    _unLogin (res, options) {
        const { _accountAlias } = options
        const origin = mapHost.get(window.location.host) || '//r1001.jinghao.com'

        window.location.replace(`${origin}/api/redirect/back?backUrl=${encodeURIComponent(window.location.href)}&accountAlias=${_accountAlias}`)
        return new CustomError('未登录', -100)
    }

    _notifier (res, options) {
        const { msg } = res.data
        const _log = typeof window.definedToast === 'function' ? window.definedToast : console.error
        _log(msg)
        return new CustomError('消息类异常', -1)
    }

    _final () {
        if (window.definedAjaxing) {
            window.definedAjaxing.flag = false
        }
    }
}
