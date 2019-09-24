import jsonp from 'jsonp'
import qs from 'qs'

/**
 * jsonp npm仓库: https://github.com/webmodules/jsonp
 */
export const requestJsonp = (url: any, params = {}, config = {}) => {
    const [_url, _search] = url.split('?')
    const _query = qs.parse(_search, { ignoreQueryPrefix: true })

    for (let key in params) {
        _query[key] = (params as any)[key]
    }

    url = [_url, '?', qs.stringify(_query)].join('')

    return new Promise((resolve, reject) => {
        jsonp(url, config, (err: any, data: any) => {
            if (err) {
                return reject(err)
            }

            resolve(data)
        })
    })
}

export const requestGet = (get: any) => {
    return function (url: any, params: any, config = {}) {
        return get(url, Object.assign({ params }, config))
    }
}
