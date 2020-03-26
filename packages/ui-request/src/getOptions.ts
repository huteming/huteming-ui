import { RequestOptions } from '../types'
import { AxiosRequestConfig } from 'axios'
import { isStandardBrowserEnv } from 'packages/ui-tools/src/main'

const mapHost = new Map([
  ['fejhdemo.jinghao.com', '//jhdemo.jinghao.com'],
  // 测试环境
  ['fejh.jinghao.com', '//jhtest.jinghao.com'],
  // 生产环境
  ['jhsy.jinghao.com', '//api.jinghao.com'],
  // 预发环境
  ['tommy.jinghao.com', '//api-staging.jinghao.com'],
  // 测试环境接口在内网，可能会无法请求
  // 本地修改 hosts 请求预发环境，模拟测试环境
  ['preissue.jinghao.com', '//api-staging.jinghao.com'],
])

const defaults = {
  baseURL: '',
  timeout: 8000,
  withCredentials: true,
  jhsyAccountAlias: '',
  jhsyRetry: 2,
  jhsyRetryDelay: 1000,
  jhsyRetryCount: 0,
}
const defaultHeaders = {
  // 'Content-Type': 'application/x-www-form-urlencoded',
}

export default function (options: AxiosRequestConfig): RequestOptions {
  const _options: RequestOptions = Object.assign({}, defaults, options, {
    headers: Object.assign({}, defaultHeaders, options.headers),
  })
  /* istanbul ignore else */
  if (!_options.baseURL && isStandardBrowserEnv()) {
    _options.baseURL = mapHost.get(window.location.host) || '//jhtest.jinghao.com'
  }

  return _options
}
