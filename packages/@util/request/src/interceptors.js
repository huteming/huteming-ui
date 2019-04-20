const mapHost = new Map([
    ['fejh.jinghao.com', '//r1001.jinghao.com'],
    ['fejhdemo.jinghao.com', '//api.jinghao.com'],
    ['jhsy.jinghao.com', '//api.jinghao.com'],
    ['tommy.jinghao.com', '//api.jinghao.com']
])

export default class Interceptor {
    constructor (options = {}) {
        this._options = options

        this._mapErrorHandler = new Map([
            [-100, this._unLogin.bind(this)], // 未登录
            [-1, this._notifier.bind(this)], // 消息类错误
        ])

        this._toast = options.toast
        this._message = options.message
    }

    resSuccess (res) {
        const { flag, hash } = res.data

        // 七牛上传
        if (res.request && res.request.responseURL && res.request.responseURL.indexOf('up.qbox.me') > -1) {
            if (!hash) {
                this._message('上传失败，刷新页面后重新上传', function () {
                    // location.reload()
                }, { cancelFlag: 'hide' })
            }
            return res
        }

        // 正常返回
        if (flag === 1) {
            return res
        }

        // 页面错误处理
        const handler = this._mapErrorHandler.get(flag)
        if (typeof handler === 'function') {
            handler(res, this._options)
        }

        throw res
    }

    resError (err) {
        return Promise.reject(err)
    }

    _unLogin (res, options) {
        const { accountAlias } = options
        const origin = mapHost.get(window.location.host) || '//r1001.jinghao.com'

        window.location.replace(`${origin}/api/redirect/back?backUrl=${encodeURIComponent(window.location.href)}&accountAlias=${accountAlias}`)
    }

    _notifier (res, options) {
        const { msg } = res.data
        this._toast(msg)
    }
}
