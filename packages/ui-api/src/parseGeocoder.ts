import request from './request'

/**
 * 解析经纬度地址坐标。http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
 * @param {Number} lng 经度
 * @param {Number} lat 纬度
 * @param {String} type 坐标类型, wgs84ll
 */
export default async function parseGeocoder ({ lng, lat, type }: any) {
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

    const data = await request.jsonp('https://api.map.baidu.com/geocoder/v2/', params)
    return data.result
}
