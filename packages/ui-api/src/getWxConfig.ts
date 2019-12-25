import request from './request'
import { isStandardBrowserEnv } from 'ui/utils/tools'
import { AxiosResponse } from 'axios'
import { WxConfigResponse } from '../types'

const defaultWX = {
  flag: 'test_tommy',
  url: '',
}

/**
 * 获取wxsdk配置参数
 */
export default function getWxConfig (options = {}): Promise<AxiosResponse<WxConfigResponse>> {
  const params = Object.assign({}, defaultWX, options)
  if (!params.url && isStandardBrowserEnv()) {
    params.url = window.location.href.split('#')[0]
  }

  return request.get('/api/user/shareParam', params)
}
