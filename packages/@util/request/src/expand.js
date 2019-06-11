import jsonp from 'jsonp'
import qs from 'qs'

/**
 * jsonp npm仓库: https://github.com/webmodules/jsonp
 */
export const requestJsonp = (url, params = {}, config = {}) => {
    const [_url, _search] = url.split('?')
    const _query = qs.parse(_search, { ignoreQueryPrefix: true })

    for (let key in params) {
        _query[key] = params[key]
    }

    url = [_url, '?', qs.stringify(_query)].join('')

    return new Promise((resolve, reject) => {
        jsonp(url, config, (err, data) => {
            if (err) {
                return reject(err)
            }

            resolve(data)
        })
    })
}

export const requestGet = (get) => {
    return function (url, params, config = {}) {
        return get(url, Object.assign({ params }, config))
    }
}
