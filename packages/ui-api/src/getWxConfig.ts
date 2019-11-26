import request from './request'

const defaultWX = {
    flag: 'test_tommy',
    url: window.location.href.split('#')[0],
}

/**
 * 获取wxsdk配置参数
 */
export default function getWxConfig (options = {}) {
    const params = Object.assign({}, defaultWX, options)

    return request.get('/api/user/shareParam', params)
}
