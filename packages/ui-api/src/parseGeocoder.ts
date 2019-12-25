import request from './request'
import { GeocoderResponse } from '../types'

/**
 * 解析经纬度地址坐标。http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
 * 测试地址: http://api.map.baidu.com/reverse_geocoding/v3/?ak=MuKc2m3OXWcQF1eof8hNkSqkqCjKjMpV&output=json&coordtype=wgs84ll&location=31.225696563611,121.49884033194
 * @param {Number} lng 经度
 * @param {Number} lat 纬度
 * @param {String} type 坐标类型, wgs84ll
 */
export default async function parseGeocoder ({ lng, lat, type }: any): Promise<GeocoderResponse> {
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
    extensions_poi: '1',
    // ak: 'xoXvW1BdjKimErNQYg7IXseGd36gzplp',
    ak: 'MuKc2m3OXWcQF1eof8hNkSqkqCjKjMpV',
  }

  const res = await request.jsonp('http://api.map.baidu.com/reverse_geocoding/v3/', params)
  return res.result
}
