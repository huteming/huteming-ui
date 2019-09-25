import { parseGeocoder, sign, getPayConfig } from 'web-util/api/src/main'
import qs from 'qs'
import _wxConfig from './wxConfig'
import _wxSave from './wxSave'

export const wxConfig = _wxConfig
export const wxSave = _wxSave

/**
 * 获取定位信息
 * 返回数据说明:http://api.map.baidu.com/lbsapi/cloud/geocoding-api.htm
 */
export async function wxLocation () {
    await wxConfig(false)
    const data: object = await getLocation()
    const result = await parseGeocoder(data)
    return result
}

/**
 * 分享。jssdk说明文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
const defaultOption = {
    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    // imgUrl: 'http://jhsy-img.caizhu.com/jhsy/images/logo-white.png', // 静好教育
    imgUrl: 'http://jhsy-img.caizhu.com/fejhsy/images/logo.png', // 静好书院
}

export async function wxShare (options: any) {
    options = Object.assign({}, defaultOption, options)

    // link
    if (!options.link.startsWith('http')) {
        options.link = `${window.location.origin}${options.link}`
    }

    // success
    const success = options.success
    options.success = () => {
        // 自己的统计
        sign('', '', { type: 'share' })

        if (typeof success === 'function') {
            success()
        }
    }

    // 添加渠道参数
    if (options.channel) {
        options.link = setChannelToLink(options)
    }

    // 添加自定义查询参数
    if (Array.isArray(options.query)) {
        options.link = setQueryToLink(options)
    }

    await wxConfig(false)

    window.wx.showMenuItems({
        menuList: [
            'menuItem:share:timeline',
            'menuItem:share:appMessage'
        ]
    })
    window.wx.onMenuShareTimeline(options)
    // wx.updateTimelineShareData(options)
    window.wx.onMenuShareAppMessage(options)
    // wx.updateAppMessageShareData(options)

    return options
}

/**
 * 微信支付
 */
export function wxpay (params: any) {
    return new Promise((resolve, reject) => {
        getPayConfig(params)
            .then((res: { data: { data: any; }; }) => {
                const { data } = res.data
                const payHandler = onBridgeReady(data, resolve, reject)

                if (typeof window.WeixinJSBridge === 'undefined') {
                    document.addEventListener('WeixinJSBridgeReady', payHandler, false)

                    // 暂时不做判断观察使用情况
                    // if (document.addEventListener) {
                    //     document.addEventListener('WeixinJSBridgeReady', payHandler, false)
                    // } else if (document.attachEvent) {
                    //     document.attachEvent('WeixinJSBridgeReady', payHandler)
                    //     document.attachEvent('onWeixinJSBridgeReady', payHandler)
                    // } else {
                    //     reject(new Error('支付失败'))
                    // }
                } else {
                    payHandler()
                }
            })
            .catch((err: any) => {
                reject(err)
            })
    })
}

/**
 * 隐藏工具栏
 */
export function wxHide () {
    window.wx.hideMenuItems({
        menuList: [
            'menuItem:share:timeline',
            'menuItem:share:appMessage'
        ]
    })
}

function getLocation (): Promise<Object> {
    return new Promise((resolve: (args: object) => void, reject: (arg0: Error) => void) => {
        window.wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'

            success (res: { latitude: number, longitude: number }) {
                // const { latitude, longitude, speed, accuracy } = res
                const { latitude, longitude } = res

                resolve({
                    lat: latitude,
                    lng: longitude,
                    type: 'wgs84ll',
                })
            },

            fail (err: { errMsg: string }) {
                reject(new Error(`定位失败: ${err.errMsg}`))
            },
        })
    })
}

/**
 * 微信支付
 */
function onBridgeReady (paramsStr: string, resolve: () => void, reject: (arg0: Error) => void) {
    return function () {
        window.WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            JSON.parse(paramsStr),
            function (res: any) {
                switch (res.err_msg) {
                case 'get_brand_wcpay_request:ok': //  支付成功
                    resolve()
                    break
                default: // 统一认为支付失败（可能为取消支付）
                    reject(new Error(`支付失败: ${res.err_msg}`))
                    break
                }
            }
        )
    }
}

// 添加地址栏中的查询参数(渠道参数)到分享地址中
function setChannelToLink ({ link }: { link: string }) {
    const [_url, _search] = link.split('?')
    const _query = qs.parse(_search)

    const { mainUnion = '', subUnion = '' } = qs.parse(window.location.href.split('?')[1], { ignoreQueryPrefix: true })

    _query['mainUnion'] = mainUnion
    _query['subUnion'] = subUnion

    return [_url, '?', qs.stringify(_query)].join('')
}

// 自定义查询参数
function setQueryToLink ({ link, query }: { link: string, query: { key: string, value: any, force: boolean }[] }) {
    const [_url, _search] = link.split('?')
    const _query = qs.parse(_search)

    query.forEach(({ key, value, force }) => {
        if (force) {
            _query[key] = value
            return
        }

        if (!_query[key]) {
            _query[key] = value
        }
    })

    return [_url, '?', qs.stringify(_query)].join('')
}
