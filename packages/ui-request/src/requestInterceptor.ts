import { stringify } from 'qs'
import { jsonToForm } from 'packages/ui-tool/src/main'
import { RequestOptions } from '../types'

export default function (config: RequestOptions): RequestOptions {
    // 在发送请求之前做些什么
    config = transformData(config)

    return config
}

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
    if (data instanceof FormData) {
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
