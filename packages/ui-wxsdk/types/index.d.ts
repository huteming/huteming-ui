export type ConfigType = 'image' | 'location'

export interface WxLocationResponse {
  lat: number
  lng: number
  type: 'wgs84ll'
}

interface WxShareQuery {
  key: string
  value: string
  force: boolean
}

export interface WxShareOptions {
  channel?: boolean // 渠道参数
  query?: WxShareQuery[] // 查询参数

  title: string // 分享标题
  desc?: string // 分享描述
  link?: string // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl?: string // 分享图标

  success?: Function // 接口调用成功时执行的回调函数。
  fail?: Function // 接口调用失败时执行的回调函数。
  complete?: Function // 接口调用完成时执行的回调函数，无论成功或失败都会执行。
  cancel?: Function // 用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
  trigger?: Function // 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
}

export interface WxShareConfig {
  channel: boolean // 渠道参数
  query: WxShareQuery[] // 查询参数

  title: string // 分享标题
  desc?: string // 分享描述
  link: string // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: string // 分享图标

  success?: Function // 接口调用成功时执行的回调函数。
  fail?: Function // 接口调用失败时执行的回调函数。
  complete?: Function // 接口调用完成时执行的回调函数，无论成功或失败都会执行。
  cancel?: Function // 用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
  trigger?: Function // 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
}
