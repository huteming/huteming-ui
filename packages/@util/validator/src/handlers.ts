import { isString } from 'web-util/types/src/index'

/**
 * 判断是否存在，忽略对象
 * @param {*Any} value
 */
export function required (value: { valueOf?: any; }, options: any) {
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

/**
 * 允许 数组，其他
 * 如果是数组，要求每一项都在enum中
 */
export function enumer (value: any, options: any) {
    if (!Array.isArray(value)) {
        value = [value]
    }

    return value.every((item: any) => options.enum.includes(item))
}

export function range (value: any, options: any) {
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

// --------------------------- 以下都是 type 的可能值

export function string (value: any, options: any) {
    return isString(value)
}

/**
 * 允许 字符串数字，数字
 */
export function number (value: any, options: any) {
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

export function boolean (value: any, options: any) {
    if (value === null || value === undefined) {
        return false
    }
    value = value.valueOf()
    return typeof value === 'boolean'
}

export function regexp (value: any, options: { regexp: any; }) {
    let _regexp = options.regexp
    if (!(_regexp instanceof RegExp)) {
        _regexp = new RegExp(_regexp)
    }
    return _regexp.test(value)
}

export function array (value: any) {
    return Array.isArray(value)
}

export function date (value: string | number | Date) {
    return new Date(value).valueOf() > 0
}

export function email (value: string) {
    return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)
}

export function mobile (value: string) {
    return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)
}
