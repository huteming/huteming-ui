import api from 'web-util/api/index.js'

// wx配置方法
const mapApis = new Map([
    [
        'default',
        [
            'hideAllNonBaseMenuItem',
            'closeWindow',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'showMenuItems',
            'hideMenuItems',
        ]
    ],
    [
        'image',
        [
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getLocalImgData',
            'chooseImage',
        ]
    ],
    [
        'location',
        [
            'getLocation',
        ]
    ],
])

/**
 * 配置签名
 * 1、这是用单例模式保存 promise：为了避免每次进入页面都重复写代码调用wx.config，
 *    通过在路由参数 meta.wxConfig 中配置需要注入的配置方法，可配置参数参考 mapApis 对象
 * 2、在 app.vue 中监听路由重置
 */
export const wxConfig = (() => {
    let _instance = Promise.resolve()

    async function update (flag, updateApis) {
        const apiList = getApiList(updateApis)
        await register(flag, apiList)
        await waiting()
    }

    return (updateApis, flag) => {
        if (updateApis) {
            _instance = update(flag, updateApis)
        }
        return _instance
    }
})()

/**
 * 保存首页地址
 * 因为ios配置地址必须为进入单页应用的首页，andriod配置地址为当前页面
 */
export const wxSave = (() => {
    let _url = ''

    return (url) => {
        if (url) {
            _url = url
        }

        const link = window.location.href
        const href = window.__wxjs_is_wkwebview ? (_url || link) : link
        return href.split('#')[0]
    }
})()

/**
 * 获取定位信息
 */
export async function wxLocation () {
    await wxConfig(false)
    const data = await getLocation()
    const result = await api.parseGeocoder(data)
    return result
}

/**
 * 分享
 */
export async function wxShare (options) {
    const defaultOption = {
        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://jhsy-img.caizhu.com/jhsy/images/logo-white.png?d=0121', // 分享图标
        success () {
            console.log('share success')
        },
    }
    options = Object.assign({}, defaultOption, options)

    // link
    if (!options.link.startsWith('http')) {
        options.link = `${location.origin}${options.link}`
    }

    // success
    const success = options.success
    options.success = () => {
        // 自己的统计
        api.sign('', '', { type: 'share' })

        success()
    }

    await wxConfig(false)

    wx.showMenuItems({
        menuList: [
            'menuItem:share:timeline',
            'menuItem:share:appMessage'
        ]
    })
    wx.onMenuShareTimeline(options)
    // wx.updateTimelineShareData(options)
    wx.onMenuShareAppMessage(options)
    // wx.updateAppMessageShareData(options)
}

/**
 * 微信支付
 */
export function wxpay (params) {
    return new Promise((resolve, reject) => {
        api.getPayConfig(params)
            .then(res => {
                const { data } = res.data
                const payHandler = onBridgeReady(data, resolve, reject)

                if (typeof WeixinJSBridge === 'undefined') {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', payHandler, false)
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', payHandler)
                        document.attachEvent('onWeixinJSBridgeReady', payHandler)
                    } else {
                        reject(new Error('支付失败'))
                    }
                } else {
                    payHandler()
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 隐藏工具栏
 */
export function wxHide () {
    wx.hideMenuItems({
        menuList: [
            'menuItem:share:timeline',
            'menuItem:share:appMessage'
        ]
    })
}

/**
 * 获取配置接口数组
 * 类型枚举: image, location
 */
function getApiList (apis = []) {
    if (typeof apis === 'string') {
        apis = [apis]
    }
    if (!Array.isArray(apis)) {
        apis = []
    }
    const configApis = apis.map(item => mapApis.get(item) || [])

    return mapApis.get('default').concat(...configApis)
}

/**
 * 配置
 */
function register (flag, jsApiList) {
    const options = {
        flag,
        url: wxSave(),
    }

    return api.getWxConfig(options)
        .then(res => {
            const { data } = res.data

            wx.config({
                debug: false,
                appId: data.AppId,
                timestamp: data.Timestamp,
                nonceStr: data.NonceStr,
                signature: data.Signature,
                jsApiList: jsApiList,
            })
        })
}

/**
 * 等待配置结果
 */
function waiting () {
    return new Promise((resolve, reject) => {
        wx.error(err => {
            reject(new Error(`签名失败; ${err.errMsg}`))
        })

        wx.ready(() => {
            setTimeout(resolve, 800)
        })
    })
}

function getLocation () {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'

            success (res) {
                // const { latitude, longitude, speed, accuracy } = res
                const { latitude, longitude } = res

                resolve({
                    lat: latitude,
                    lng: longitude,
                    type: 'wgs84ll',
                })
            },

            fail () {
                reject(new Error('定位失败'))
            },
        })
    })
}

/**
 * 微信支付
 */
function onBridgeReady (paramsStr, resolve, reject) {
    return function () {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            JSON.parse(paramsStr),
            function (res) {
                switch (res.err_msg) {
                case 'get_brand_wcpay_request:ok': //  支付成功
                    resolve()
                    break
                default: // 统一认为支付失败（可能为取消支付）
                    reject(res.err_msg)
                    break
                }
            }
        )
    }
}
