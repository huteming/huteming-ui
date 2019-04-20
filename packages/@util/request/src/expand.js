import jsonp from 'jsonp'

export const requestJsonp = (url, params = {}) => {
    const splitor = url.indexOf('?') > -1 ? '&' : '?'
    url += splitor

    for (let key in params) {
        url += `${key}=${params[key]}&`
    }

    return new Promise((resolve, reject) => {
        jsonp(url, null, (err, data) => {
            if (err) {
                return reject(err)
            }

            resolve(data)
        })
    })
}

export const requestGet = (handler) => {
    const _handler = handler
    return function (url, params, config = {}) {
        return _handler(url, Object.assign({ params }, config))
    }
}
