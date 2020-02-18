import { parseGeocoder } from 'packages/ui-api/src/main'
import wxConfig from './wxConfig'
import { WxLocationResponse } from '../types'

/**
 * 获取定位信息
 * 返回数据说明:http://api.map.baidu.com/lbsapi/cloud/geocoding-api.htm
 */
export default async function wxLocation () {
  await wxConfig(false)
  const data = await getLocation()
  const result = await parseGeocoder(data)
  return result
}

function getLocation (): Promise<WxLocationResponse> {
  return new Promise((resolve, reject) => {
    window.wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'

      success (res) {
        // const { latitude, longitude, speed, accuracy } = res
        const { latitude, longitude } = res

        resolve({
          lat: latitude,
          lng: longitude,
          type: 'wgs84ll',
        })
      },

      fail (err) {
        reject(new Error(`定位失败: ${err.errMsg}`))
      },
    })
  })
}
