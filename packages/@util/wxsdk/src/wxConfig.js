import wxSave from './wxSave'
import { getWxConfig } from 'web-util/api/src/main'

/**
 * 配置签名
 * 1、这是用单例模式保存 promise：为了避免每次进入页面都重复写代码调用wx.config，
 *    通过在路由参数 meta.wxConfig 中配置需要注入的配置方法，可配置参数参考 mapApis 对象
 * 2、在 app.vue 中监听路由重置
 */
let instance = Promise.resolve()
let updateID = 0

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

// 获取配置接口数组
export function getApiList (apis) {
    if (typeof apis === 'string') {
        apis = [apis]
    }
    if (!Array.isArray(apis)) {
        apis = []
    }
    const configApis = apis.map(item => mapApis.get(item) || [])

    return mapApis.get('default').concat(...configApis)
}

// 配置
export function register (flag, jsApiList) {
    const options = {
        flag,
        url: wxSave(),
    }

    return getWxConfig(options)
        .then(res => {
            const { data } = res.data

            wx.config({
                debug: process.env.NODE_ENV !== 'production',
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
export function waiting (currentID) {
    return new Promise((resolve, reject) => {
        wx.error(err => {
            if (currentID < updateID) return
            reject(new Error(`签名失败: ${err.errMsg}`))
        })

        wx.ready(() => {
            if (currentID < updateID) return
            resolve()
        })
    })
}

async function update (updateID, flag, updateApis) {
    const apiList = getApiList(updateApis)
    await register(flag, apiList)
    await waiting(updateID)
}

export default (updateApis, flag) => {
    if (updateApis) {
        updateID++
        instance = update(updateID, flag, updateApis)
    }
    return instance
}
