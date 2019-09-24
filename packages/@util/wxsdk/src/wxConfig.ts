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
const defaultApis = [
    'hideAllNonBaseMenuItem',
    'closeWindow',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'showMenuItems',
    'hideMenuItems',
]
const mapApis = new Map([
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
export function getApiList (apis: any) {
    if (typeof apis === 'string') {
        apis = [apis]
    }
    if (!Array.isArray(apis)) {
        apis = []
    }
    const configApis = apis.map((item: string) => mapApis.get(item) || [])

    return defaultApis.concat(...configApis)
}

// 配置
export function register (flag: any, jsApiList: string[]) {
    const options = {
        flag,
        url: wxSave(),
    }

    return getWxConfig(options)
        .then((res: { data: { data: any; }; }) => {
            const { data } = res.data

            window.wx.config({
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
export function waiting (registerID: number) {
    return new Promise((resolve: () => void, reject: (a: Error) => void) => {
        window.wx.error((err: { errMsg: any; }) => {
            const registerItem = record.find(registerID)
            const latestItem = record.find(latestID)

            if (registerID < latestID) {
                return reject(new Error(`签名失败: ${err.errMsg}。链接过期: ${registerItem.url}。最新链接: ${latestItem.url}`))
            }
            reject(new Error(`签名失败: ${err.errMsg}。签名链接: ${registerItem.url}`))
        })

        window.wx.ready(() => {
            resolve()
        })
    })
}

async function update (registerID: number, flag: any, updateApis: any) {
    const apiList = getApiList(updateApis)
    await register(flag, apiList)
    await waiting(registerID)
}

// todo优化：对于ios来说，地址总是第一次进入的页面，不会改变，所以 config 一次即可
export default (updateApis: any, flag?: any) => {
    if (updateApis) {
        latestID = record.create(wxSave())
        instance = update(latestID, flag, updateApis)
    }
    return instance
}
