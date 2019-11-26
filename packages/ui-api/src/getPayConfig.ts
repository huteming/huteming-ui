import request from './request'

/**
 * 获取支付参数
 */
export default function getPayConfig (params?: object) {
    return request.post('/api/weixin/getPayParameters', params)
}
