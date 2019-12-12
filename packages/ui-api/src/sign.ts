import request from './request'
import { isStandardBrowserEnv } from 'ui/utils/tools'

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
export default function sign (itemSign: string, itemRemark: string, options = {}) {
    itemSign = itemSign || (isStandardBrowserEnv() ? window.location.href.replace(window.location.origin, '') : 'ServerSide#')
    itemRemark = itemRemark || (isStandardBrowserEnv() ? document.title : 'ServerSide#')

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
