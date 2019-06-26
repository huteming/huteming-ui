import { isString } from 'web-util/types/src'

/**
 * 判断是否存在，忽略对象
 * @param {*Any} value
 */
export function required (value) {
    if (value === undefined || value === null) {
        return false
    }
    if (value instanceof Date) {
        return true
    }
    value = value.valueOf()
    if (typeof value === 'string' && !value) {
        return false
    }
    if (typeof value === 'function') {
        return true
    }
    if (value instanceof Object) {
        return !!Object.keys(value).length
    }
    return true
}

export function string (value, options) {
    return isString(value)
}

/**
 * 允许 字符串数字，数字
 */
export function number (value, options) {
    if (value === null || value === undefined || value instanceof Date) {
        return false
    }
    value = value.valueOf()
    if (typeof value === 'number') {
        return true
    }
    if (typeof value === 'string' && value !== '') {
        const _value = Number(value)
        return !isNaN(_value)
    }
    return false
}

export function boolean (value, options) {
    if (value === null || value === undefined) {
        return false
    }
    value = value.valueOf()
    return typeof value === 'boolean'
}

export function regexp (value, options) {
    let _regexp = options.regexp
    if (!(_regexp instanceof RegExp)) {
        _regexp = new RegExp(_regexp)
    }
    return _regexp.test(value)
}

export function array (value) {
    return Array.isArray(value)
}

/**
 * 允许 数组，其他
 * 如果是数组，要求每一项都在enum中
 */
export function enumer (value, options) {
    if (!Array.isArray(value)) {
        value = [value]
    }

    return value.every(item => options.enum.includes(item))
}

export function date (value) {
    return new Date(value).valueOf() > 0
}

export function email (value) {
    return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)
}

export function mobile (value) {
    return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)
}

export function range (value, options) {
    let { min, max } = options

    if (typeof min !== 'number') {
        min = -Infinity
    }

    if (typeof max !== 'number') {
        max = Infinity
    }

    if (options.type === 'string' || options.type === 'array') {
        value = value.length
    }

    return value >= min && value <= max
}
