const IMG_SUFFIX = 'tommy'

/**
 * 是否微信内
 */
export function isWeixinBrowser () {
    return /micromessenger/.test(window.navigator.userAgent.toLowerCase())
}

/**
 * 小数点之前补0
 * @param {Number|String} value 数据
 * @param {Number} fractionDigits 小数点前保留位数
 */
export function tofilled (value, fractionDigits = 0) {
    const allowType = new Set(['string', 'number'])
    if (!allowType.has(typeof value) || value === '' || isNaN(Number(value))) {
        return ''
    }

    let _value = value.toString()
    const diff = fractionDigits - _value.split('.')[0].length

    for (let i = 0; i < diff; i++) {
        _value = `0${_value}`
    }

    return _value
}

/**
 * 保留小数点后位数
 * @param {Number|String} value 数据
 * @param {Number} fractionDigits 小数点后保留位数
 * @param {Boolean} toNumber 是否转为数字
 */
export function tofixed (value, fractionDigits = 2, toNumber = false) {
    const allowType = new Set(['string', 'number'])
    if (!allowType.has(typeof value) || value === '' || isNaN(Number(value))) {
        return ''
    }

    let _value = value.toString()
    const _beforeDigits = _value.split('.')[0].length
    _value = Number(_value).toFixed(fractionDigits)
    _value = tofilled(_value, _beforeDigits)

    return toNumber ? Number(_value) : _value
}

/**
 * 批量加载图片
 * @param {Array|String} urls 图片地址
 * @param {Boolean} useCache 是否使用缓存
 *
 * @returns {Promise<Array|String>}
 */
export function loadImages (urls, useCache = true) {
    if (Array.isArray(urls)) {
        const promises = urls.map(url => loadImageSingle(url, useCache))
        return Promise.all(promises)
    }
    return loadImageSingle(urls, useCache)
}

/**
 * json => form
 * @param {*Object} data json数据
 *
 * @returns {FormData}
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

function loadImageSingle (url, useCache) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.setAttribute('crossOrigin', 'anonymous')

        const separator = url.indexOf('?') > -1 ? '&' : '?'
        url = `${url}${separator}timestamp=${useCache ? IMG_SUFFIX : Date.now()}`

        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject(new Error(`渲染地址错误;实际:${url}`))
        }

        img.src = url
    })
}
