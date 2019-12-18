import axios, { AxiosInstance } from 'axios'
import CustomError from './customError'
import { RequestOptions, RequestError } from '../types'
import { sleep } from '@huteming/ui-tools/src/main'

export default function (instance: AxiosInstance, options: RequestOptions) {
  return async function (err: RequestError) {
    const config: RequestOptions = err.config

    if (axios.isCancel(err)) {
      return Promise.reject(new CustomError('请求取消'))
    }

    if (!config || err.message === 'Network Error') {
      return Promise.reject(err)
    }

    if (config.jhsyRetryCount >= config.jhsyRetry) {
      return Promise.reject(err)
    }

    config.jhsyRetryCount += 1

    await sleep(config.jhsyRetryDelay)
    return instance(config)
  }
}
