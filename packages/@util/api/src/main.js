import requestFactory from 'web-util/request/index.js'

// 导出只是为了方便测试
export const request = requestFactory()

/**
 * 统计接口
 * @param {Object} options 配置项
 */
const defaultSign = {
    type: '', // 可选值 share
}

export function sign (itemSign, itemRemark, options = {}) {
    itemSign = itemSign || `${location.pathname}${location.search}`
    itemRemark = itemRemark || document.title || ''

    options = Object.assign({}, defaultSign, options)

    if (options.type === 'share') {
        itemSign = 'SHARE#' + itemSign
    }

    const params = {
        itemSign,
        itemRemark,
    }
    return request.post('api/system/pageStat', params)
        .catch(err => {
            console.log(err)
        })
}

/**
 * 获取支付参数
 */
export function getPayConfig (params) {
    return request.post('/api/weixin/getPayParameters', params)
}

/**
 * 获取wxsdk配置参数
 */
const defaultWX = {
    flag: 'test_tommy',
    url: window.location.href.split('#')[0],
}

export function getWxConfig (options = {}) {
    const { flag, url } = options

    if (flag === undefined || flag === null) {
        throw new Error('参数缺失[flag]')
    }

    if (!url) {
        throw new Error('参数缺失[url]')
    }

    const params = Object.assign({}, defaultWX, options)

    return request.post('/api/user/shareParam', params)
}

/**
 * 解析经纬度地址坐标
 * @param {Number} lng 经度
 * @param {Number} lat 纬度
 * @param {String} type 坐标类型, wgs84ll
 */
export function parseGeocoder ({ lng, lat, type }) {
    const params = {
        location: `${lat},${lng}`,
        coordtype: type,
        output: 'json',
        pois: '1',
        ak: 'xoXvW1BdjKimErNQYg7IXseGd36gzplp',
    }

    return request.jsonp('https://api.map.baidu.com/geocoder/v2/', params)
        .then(data => {
            return data.result
        })
        .catch(err => {
            console.log(err)
            throw new Error('定位失败')
        })
}
