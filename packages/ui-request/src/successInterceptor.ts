import { AxiosResponse } from 'axios'
import { Request, RequestOptions } from '../types'
import CustomError from './customError'

const mapErrorHandler = new Map([
    [-100, unLogin],
    [-1, notifier],
])

export default async function (this: Request, res: AxiosResponse): Promise<any> {
    const { flag, hash } = res.data

    // 七牛上传
    if (res.config && res.config.url && res.config.url.indexOf('up.qbox.me') > -1) {
        if (!hash) {
            return Promise.reject(res)
        }
        return res
    }

    // 正常返回
    if (flag === 1) {
        return res
    }

    // 页面错误处理
    const handler = mapErrorHandler.get(flag) || function () {}
    const _customError = handler(res, this.options)
    final()

    return Promise.reject(_customError || res)
}

// 未登录
function unLogin (res: AxiosResponse, options: RequestOptions): CustomError {
    const { jhsyAccountAlias } = options
    const { config: { baseURL }, data: { flag } } = res

    window.location.replace(`${baseURL}/api/redirect/back?backUrl=${encodeURIComponent(window.location.href)}&accountAlias=${jhsyAccountAlias}`)
    return new CustomError('未登录', flag)
}

// 消息类错误
function notifier (res: AxiosResponse, options: RequestOptions): CustomError {
    const { data: { flag, msg } } = res
    const toast = typeof window.definedToast === 'function' ? window.definedToast : console.error
    toast(msg)
    return new CustomError('消息类异常', flag)
}

function final () {
    if (window.definedAjaxing) {
        window.definedAjaxing.flag = false
    }
}
