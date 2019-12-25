import wxSave from './wxSave'
import { getWxConfig } from 'packages/ui-api/src/main'
import { ConfigType } from '../types'

/**
 * 配置签名
 * 1、这是用单例模式保存 promise：为了避免每次进入页面都重复写代码调用wx.config，
 *    通过在路由参数 meta.wxConfig 中配置需要注入的配置方法，可配置参数参考 mapApis 对象
 * 2、在 app.vue 中监听路由重置
 */
let instance = Promise.resolve()

// wx配置方法
const defaultApis = [
  'hideAllNonBaseMenuItem',
  'closeWindow',
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'showMenuItems',
  'hideMenuItems',
]
const mapApis = new Map([
  [
    'image',
    [
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getLocalImgData',
      'chooseImage',
    ],
  ],
  [
    'location',
    [
      'getLocation',
    ],
  ],
])

// todo优化：对于ios来说，地址总是第一次进入的页面，不会改变，所以 config 一次即可
export default (updateApis?: boolean | ConfigType | ConfigType[], flag: string = '') => {
  if (updateApis) {
    instance = update(updateApis, flag)
  }
  return instance
}

// 配置
export async function register (jsApiList: string[], flag: string) {
  const options = {
    flag,
    url: wxSave(),
  }
  const { data: { data } } = await getWxConfig(options)

  const config = {
    debug: process.env.NODE_ENV !== 'production',
    appId: data.AppId,
    timestamp: data.Timestamp,
    nonceStr: data.NonceStr,
    signature: data.Signature,
    jsApiList: jsApiList,
  }
  window.wx.config(config)

  return Object.assign({}, config, options)
}

// todo: error, ready 注册的回调函数一直存在，所以只需要注册一次即可，否则可能出现错误的消息结果
// 等待配置结果
export function waiting (url: string) {
  return new Promise((resolve, reject) => {
    window.wx.error((err) => {
      reject(new Error(`签名失败: ${err.errMsg}。签名链接: ${url}`))
    })

    window.wx.ready(() => {
      resolve()
    })
  })
}

export async function update (updateApis: boolean | ConfigType | ConfigType[], flag: string) {
  const jsApiList = getApiList(updateApis)
  const { url } = await register(jsApiList, flag)
  await waiting(url)
}

// 获取配置接口数组
export function getApiList (updateApis: boolean | ConfigType | ConfigType[]) {
  if (typeof updateApis === 'string') {
    updateApis = [updateApis]
  }
  if (!Array.isArray(updateApis)) {
    updateApis = []
  }
  const configApis = updateApis.map((item: ConfigType) => mapApis.get(item) || [])

  return defaultApis.concat(...configApis)
}
