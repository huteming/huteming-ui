import request from './request'

const defaultSign = {
    type: '', // 可选值 share, click
}
const mapPrefix = new Map([
    ['share', 'SHARE#'],
    ['click', 'CLICK#']
])

/**
 * 统计接口
 */
export default function sign (itemSign: any, itemRemark: any, options = {}) {
    itemSign = itemSign || window.location.href.replace(window.location.origin, '')
    itemRemark = itemRemark || document.title

    const { type } = Object.assign({}, defaultSign, options)

    if (mapPrefix.has(type)) {
        itemSign = mapPrefix.get(type) + itemSign
    }

    const params = {
        itemSign,
        itemRemark,
    }
    return request.post('/api/system/pageStat', params)
}
