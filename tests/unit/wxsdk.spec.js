import { __RewireAPI__ as WxsdkRewireAPI, wxConfig, mapApis, wxSave, wxHide, wxShare } from 'web-util/wxsdk/src/main'
import assert from 'assert'
import sinon from 'sinon'
import qs from 'qs'
let config
let location
let hideMenuItems
let showMenuItems
let onShare
let invoke
let mockSign
const FLAG_FAILURE = 'failure'
const FLAG_SUCCESS = 'success'
const AppId = 'AppId'
const Timestamp = 'Timestamp'
const NonceStr = 'NonceStr'
const Signature = 'Signature'
const latitude = 'latitude'
const longitude = 'longitude'
const resGetPayConfig = {
    b: 'a',
    j: 'e',
}
const href = `http://localhost?mainUnion=mainUnionaaa&subUnion=subUnionaaa`
let originWindow

describe('wxsdk', () => {
    beforeEach(async () => {
        originWindow = global.window
        config = sinon.fake()
        location = sinon.fake()
        hideMenuItems = sinon.fake()
        showMenuItems = sinon.fake()
        onShare = sinon.fake()
        invoke = sinon.fake()
        mockSign = sinon.fake.resolves()

        const _onShare = (options) => {
            onShare(options)
            const { success } = options
            success()
        }

        WxsdkRewireAPI.__Rewire__('getWxConfig', () => {
            return Promise.resolve({
                data: {
                    data: { AppId, Timestamp, NonceStr, Signature },
                }
            })
        })

        WxsdkRewireAPI.__Rewire__('getPayConfig', () => {
            // setTimeout(() => {
            //     const event = new Event('WeixinJSBridgeReady')
            //     document.dispatchEvent(event)
            // }, 5)
            return Promise.resolve({
                data: {
                    data: JSON.stringify(resGetPayConfig),
                }
            })
        })

        WxsdkRewireAPI.__Rewire__('sign', mockSign)

        global.window = {
            WeixinJSBridge: {
                invoke (str, obj, fn) {
                    invoke(...arguments)
                    fn({ err_msg: 'get_brand_wcpay_request:ok' })
                },
            },
            location: {
                href,
            },
        }

        global.wx = {
            onerror: null,
            onready: null,

            config (...args) {
                config(...args)
                setTimeout(() => {
                    if (global.__wx === FLAG_FAILURE) {
                        return this.onerror({ errMsg: 'config' })
                    }
                    this.onready()
                }, 5)
            },
            getLocation (options) {
                location(options)
                const { success, fail } = options
                setTimeout(() => {
                    if (global.__wx === FLAG_FAILURE) {
                        return fail({ errMsg: 'location' })
                    }
                    success({ latitude, longitude })
                })
            },
            error (callback) {
                this.onerror = callback
            },
            ready (callback) {
                this.onready = callback
            },
            hideMenuItems,
            showMenuItems,
            onMenuShareTimeline: onShare,
            onMenuShareAppMessage: _onShare,
        }
    })

    afterEach(() => {
        sinon.restore()
        WxsdkRewireAPI.__ResetDependency__('getWxConfig')
        WxsdkRewireAPI.__ResetDependency__('getPayConfig')
        WxsdkRewireAPI.__ResetDependency__('sign')
        global.wx = null
        global.__wx = FLAG_SUCCESS
        global.window = originWindow
    })

    describe('wxConfig', () => {
        it('返回Promise', () => {
            const res = wxConfig()
            assert.ok(res instanceof Promise)
        })

        it('第一个参数为falsy返回相同Promise', () => {
            const res1 = wxConfig()
            const res2 = wxConfig(false)
            assert.strictEqual(res1, res2)
        })

        it('空注册', async () => {
            await wxConfig(true, 'flag')
            const spyCall = config.getCall(0)
            assert.deepStrictEqual(spyCall.args[0].jsApiList, mapApis.get('default'))
        })

        it('注册image', async () => {
            await wxConfig('image', 'flag')
            const spyCall = config.getCall(0)
            const apiList = [].concat(mapApis.get('default'), mapApis.get('image'))
            assert.deepStrictEqual(spyCall.args[0].jsApiList, apiList)
        })

        it('注册location', async () => {
            await wxConfig('location', 'flag')
            const spyCall = config.getCall(0)
            const apiList = [].concat(mapApis.get('default'), mapApis.get('location'))
            assert.deepStrictEqual(spyCall.args[0].jsApiList, apiList)
        })

        it('注册location && 注册image', async () => {
            await wxConfig(['location', 'image'], 'flag')
            const spyCall = config.getCall(0)
            const apiList = [].concat(mapApis.get('default'), mapApis.get('location'), mapApis.get('image'))
            assert.deepStrictEqual(spyCall.args[0].jsApiList, apiList)
        })

        it('wx.confing参数', async () => {
            await wxConfig(true, 'flag')
            const spyCall = config.getCall(0)
            const data = {
                debug: false,
                appId: AppId,
                timestamp: Timestamp,
                nonceStr: NonceStr,
                signature: Signature,
                jsApiList: mapApis.get('default'),
            }
            assert.deepStrictEqual(spyCall.args[0], data)
        })

        it('注册异常捕获', done => {
            global.__wx = FLAG_FAILURE
            wxConfig(true, 'flag')
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err.message, '签名失败; config')
                    done()
                })
                .finally(() => {
                    // 因为 wxConfig 是一个闭包，这里还原内部 Promise 为 resolve 状态
                    global.__wx = FLAG_SUCCESS
                    wxConfig(true, 'flag')
                })
        })
    })

    describe('wxSave', () => {
        it('默认获取浏览器地址', () => {
            const url = wxSave()
            assert.strictEqual(url, href)
        })

        it('安卓环境 + url = href', () => {
            global.window.__wxjs_is_wkwebview = false
            wxSave('hello')

            const url = wxSave()
            assert.strictEqual(url, href)

            global.window.__wxjs_is_wkwebview = undefined
        })

        it('ios + url = url', () => {
            global.window.__wxjs_is_wkwebview = true
            wxSave('hello')

            const url = wxSave()
            assert.strictEqual(url, 'hello')

            global.window.__wxjs_is_wkwebview = undefined
        })
    })

    describe('wxShare', () => {
        it('获取当前wxConfig', async () => {
            await wxShare()
            assert.ok(config.notCalled)
        })

        it('调用wx.showMenuItems', async () => {
            await wxShare()
            const spyCall = showMenuItems.getCall(0)
            assert.deepStrictEqual(spyCall.args[0], {
                menuList: [
                    'menuItem:share:timeline',
                    'menuItem:share:appMessage'
                ]
            })
        })

        it('调用wx.onMenuShareTimeline && wx.onMenuShareAppMessage', async () => {
            await wxShare()
            assert.strictEqual(onShare.callCount, 2)
        })

        it('绝对路径自动补全', async () => {
            const link = '/test/test'
            const options = {
                link,
            }
            const resOptions = await wxShare(options)
            assert.strictEqual(resOptions.link, `${global.window.location.origin}${link}`)
        })

        it('调用自定义统计', async () => {
            await wxShare()
            const spyCall = mockSign.getCall(0)
            assert.strictEqual(spyCall.args[0], '')
            assert.strictEqual(spyCall.args[1], '')
            assert.deepStrictEqual(spyCall.args[2], { type: 'share' })
        })

        it('自定义success回调', async () => {
            const success = sinon.fake()
            await wxShare({ success })
            assert.ok(success.called)
        })

        it('添加渠道参数', async () => {
            const resOptions = await wxShare({ channel: true, link: '/hello' })
            const { mainUnion, subUnion } = qs.parse(resOptions.link.split('?')[1], { ignoreQueryPrefix: true })
            assert.strictEqual(mainUnion, 'mainUnionaaa')
            assert.strictEqual(subUnion, 'subUnionaaa')
        })

        it('添加查询参数', async () => {
            const query = [
                {
                    key: 'qq',
                    value: 'qq',
                },
            ]
            const resOptions = await wxShare({ query })
            const { qq } = qs.parse(resOptions.link.split('?')[1], { ignoreQueryPrefix: true })
            assert.strictEqual(qq, 'qq')
        })

        it('查询参数可以强制覆盖渠道参数', async () => {
            const query = [
                {
                    key: 'mainUnion',
                    value: 'qq',
                    force: true,
                },
            ]
            const resOptions = await wxShare({ query, channel: true })
            const { mainUnion } = qs.parse(resOptions.link.split('?')[1], { ignoreQueryPrefix: true })
            assert.strictEqual(mainUnion, 'qq')
        })
    })

    describe('wxHide', () => {
        it('调用参数格式', () => {
            wxHide()
            const spyCall = hideMenuItems.getCall(0)
            const expect = {
                menuList: [
                    'menuItem:share:timeline',
                    'menuItem:share:appMessage'
                ]
            }
            assert.deepStrictEqual(spyCall.args[0], expect)
        })
    })
})
