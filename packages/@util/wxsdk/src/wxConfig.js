import wxSave from './wxSave'
import { getWxConfig } from 'web-util/api/src/main'
import record from './records-config'

/**
 * 配置签名
 * 1、这是用单例模式保存 promise：为了避免每次进入页面都重复写代码调用wx.config，
 *    通过在路由参数 meta.wxConfig 中配置需要注入的配置方法，可配置参数参考 mapApis 对象
 * 2、在 app.vue 中监听路由重置
 */
let instance = Promise.resolve()
let latestID = 0

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

// todo: error, ready 注册的回调函数一直存在，所以只需要注册一次即可，否则可能出现错误的消息结果
// 等待配置结果
export function waiting (registerID) {
    return new Promise((resolve, reject) => {
        wx.error(err => {
            const registerItem = record.find(registerID)
            const latestItem = record.find(latestID)

            if (registerID < latestID) {
                return reject(new Error(`签名失败: ${err.errMsg}。链接过期: ${registerItem.url}。最新链接: ${latestItem.url}`))
            }
            reject(new Error(`签名失败: ${err.errMsg}。签名链接: ${registerItem.url}`))
        })

        wx.ready(() => {
            resolve()
        })
    })
}

async function update (registerID, flag, updateApis) {
    const apiList = getApiList(updateApis)
    await register(flag, apiList)
    await waiting(registerID)
}

// todo优化：对于ios来说，地址总是第一次进入的页面，不会改变，所以 config 一次即可
export default (updateApis, flag) => {
    if (updateApis) {
        latestID = record.create(wxSave())
        instance = update(latestID, flag, updateApis)
    }
    return instance
}
