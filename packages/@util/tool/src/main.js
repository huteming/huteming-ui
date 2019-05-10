/**
 * @param {Number|String} value 数据
 * @param {Number} fractionDigits 保留位数
 * @param {Boolean} toNumber 是否转为数字
 */
export function tofixed (value, fractionDigits = 2, toNumber = false) {
    value = Number(value)

    if (isNaN(value)) {
        return 0
    }

    value = value.toFixed(fractionDigits)

    return toNumber ? Number(value) : value
}

/**
 * 批量加载图片
 * @argument {Array} urls
 */
export function loadImages (urls) {
    if (Array.isArray(urls)) {
        const promises = urls.map(loadImageSingle)
        return Promise.all(promises)
    }
    return loadImageSingle(urls)
}

/**
 * json => form
 * @param {*Object} data json数据
 */
export const jsonToForm = (data) => {
    const params = new FormData()

    for (let key in data) {
        params.append(key, data[key])
    }

    return params
}

/**
 * 从 url 中解析查询参数
 * @param {*String} target 目标key值
 */
export function parseQuery (target) {
    const querys = window.location.href.match(/[^?]*$/)[0].split('&')
    const length = querys.length

    for (let i = 0; i < length; i++) {
        const [key, value] = querys[i].split('=')
        if (target === key) {
            return value
        }
    }

    return ''
}

function loadImageSingle (url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const separator = url.indexOf('?') > -1 ? '&' : '?'
        img.setAttribute('crossOrigin', 'anonymous')

        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject(new Error(`渲染地址错误[${url}]`))
        }

        img.src = `${url}${separator}timestamp=${Date.now()}`
    })
}
