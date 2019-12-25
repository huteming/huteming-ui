import { AxiosResponse } from 'axios'

interface WxConfigData {
  AppId: string
  NonceStr: string
  Timestamp: number
  Url: string
  ShareUrl: string
  Signature: string
  RawString: string
  jsapiTicket: string
  ShareMember: string
}

export interface WxConfigResponse {
  data: WxConfigData
}

interface Location {
  lat: number // 纬度值
  lng: number // 经度值
}

interface Address {
  country: string // 国家
  province: string // 省名
  city: string // 城市名
  district: string // 区县名
  town: string // 乡镇名
  town_code: string // 乡镇id
  street: string // 街道名（行政区划中的街道层级）
  street_number: string // 街道门牌号
  adcode: number // 行政区划代码
  country_code: number // 国家代码
  direction: string // 相对当前坐标点的方向，当有门牌号的时候返回数据
  distance: string // 相对当前坐标点的距离，当有门牌号的时候返回数据
}

export interface GeocoderResponse {
  location: Location // 经纬度坐标
  formatted_address: string // 结构化地址信息
  business: string // 坐标所在商圈信息，如 "人民大学,中关村,苏州街"。最多返回3个。
  addressComponent: Address // （注意，国外行政区划，字段仅代表层级）
}
