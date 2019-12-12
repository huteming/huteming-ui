import request from './request'
import { isStandardBrowserEnv } from 'ui/utils/tools'

const defaultWX = {
    flag: 'test_tommy',
    url: isStandardBrowserEnv() ? window.location.href.split('#')[0] : '',
}

/**
 * 获取wxsdk配置参数
 */
export default function getWxConfig (options = {}) {
    const params = Object.assign({}, defaultWX, options)

    return request.get('/api/user/shareParam', params)
}
