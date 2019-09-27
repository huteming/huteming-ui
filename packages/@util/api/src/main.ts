import requestFactory from 'web-util/request/src/main'

// 导出只是为了方便测试
export const request = new requestFactory()

/**
 * 统计接口
 * @param {Object} options 配置项
 */
const defaultSign = {
    type: '', // 可选值 share, click
}
const mapPrefix = new Map([
    ['share', 'SHARE#'],
    ['click', 'CLICK#']
])

export function sign (itemSign: any, itemRemark: any, options = {}) {
    itemSign = itemSign || window.location.href.replace(window.location.origin, '')
    itemRemark = itemRemark || document.title

    const { type } = Object.assign({}, defaultSign, options)

    if (mapPrefix.has(type)) {
        itemSign = mapPrefix.get(type) + itemSign
    }

    const params = {
        itemSign,
        itemRemark,
    }
    return request.post('/api/system/pageStat', params)
}

/**
 * 获取支付参数
 */
export function getPayConfig (params: any) {
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
    const params = Object.assign({}, defaultWX, options)

    return request.get('/api/user/shareParam', params)
}

/**
 * 解析经纬度地址坐标。http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
 * @param {Number} lng 经度
 * @param {Number} lat 纬度
 * @param {String} type 坐标类型, wgs84ll
 */
export function parseGeocoder ({ lng, lat, type }: any) {
    if (!lng) {
        return Promise.reject(new Error('经度参数缺失[lng]'))
    }

    if (!lat) {
        return Promise.reject(new Error('纬度参数缺失[lat]'))
    }

    if (!type) {
        return Promise.reject(new Error('坐标类型参数缺失[type]'))
    }

    const params = {
        location: `${lat},${lng}`,
        coordtype: type,
        output: 'json',
        pois: '1',
        ak: 'xoXvW1BdjKimErNQYg7IXseGd36gzplp',
    }

    return request.jsonp('https://api.map.baidu.com/geocoder/v2/', params)
        .then((data: any) => {
            return data.result
        })
}
