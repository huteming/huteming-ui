import { stringify } from 'utils/tools'
import { jsonToForm } from '@huteming/ui-tools/src/main'
import { RequestOptions } from '../types'
import { isFormData } from '@huteming/ui-types/src/main'
import { AxiosInstance } from 'axios'

export default function (instance: AxiosInstance, options: RequestOptions) {
  return function (config: RequestOptions): RequestOptions {
    // 在发送请求之前做些什么
    config = transformData(config)

    return config
  }
}

/**
 * 转换数据体格式
 */
function transformData (config: RequestOptions): RequestOptions {
  const data = config.data

  // 数据体不存在
  if (!data) {
    return config
  }

  // string 不处理
  if (typeof data === 'string') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  }

  // formData 不处理
  if (isFormData(data)) {
    config.headers['Content-Type'] = 'multipart/form-data'
    return config
  }

  // 不转换
  if (data._type === 'json') {
    delete data._type
    config.headers['Content-Type'] = 'application/json'
    return config
  }

  // => formData
  if (data._type === 'form') {
    delete data._type
    config.data = jsonToForm(data)
    config.headers['Content-Type'] = 'multipart/form-data'
    return config
  }

  // => string
  delete data._type
  config.data = stringify(data)
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

  return config
}
