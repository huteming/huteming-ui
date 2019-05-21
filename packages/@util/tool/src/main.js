/**
 * 是否微信内
 */
export function isWeixinBrowser () {
    return /micromessenger/.test(navigator.userAgent.toLowerCase())
}

/**
 * 小数点之前补齐的位数
 * @param {Number|String} value 数据
 * @param {Number} fractionDigits 小数点前保留位数
 */
export function tofilled (value, fractionDigits = 0) {
    if (value === null || value === undefined) {
        throw new Error('value不能为空')
    }

    if (isNaN(Number(value))) {
        throw new Error(`value必须可转为number类型,实际为 ${value}`)
    }

    let _value = value.toString()
    const diff = fractionDigits - _value.split('.')[0].length

    for (let i = 0; i < diff; i++) {
        _value = `0${_value}`
    }

    return _value
}

/**
 * @param {Number|String} value 数据
 * @param {Number} fractionDigits 小数点后保留位数
 * @param {Boolean} toNumber 是否转为数字
 */
export function tofixed (value, fractionDigits = 2, toNumber = false) {
    if (value === null || value === undefined) {
        throw new Error('value不能为空')
    }

    if (isNaN(Number(value))) {
        throw new Error(`value必须可转为number类型,实际为 ${value}`)
    }

    let _value = value.toString()
    const _beforeDigits = _value.split('.')[0].length
    _value = Number(_value).toFixed(fractionDigits)
    _value = tofilled(_value, _beforeDigits)

    return toNumber ? Number(_value) : _value
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
