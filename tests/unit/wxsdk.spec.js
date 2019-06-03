import { __RewireAPI__ as WxsdkRewireAPI, wxConfig, mapApis, wxSave, wxHide } from 'web-util/wxsdk/src/main'
import assert from 'assert'
import sinon from 'sinon'
let config
let hideMenuItems
const FLAG_FAILURE = 'failure'
const AppId = 'AppId'
const Timestamp = 'Timestamp'
const NonceStr = 'NonceStr'
const Signature = 'Signature'
const latitude = 'latitude'
const longitude = 'longitude'

describe('wxsdk', () => {
    beforeEach(async () => {
        config = sinon.fake()
        hideMenuItems = sinon.fake()

        WxsdkRewireAPI.__Rewire__('getWxConfig', () => {
            return Promise.resolve({
                data: {
                    data: { AppId, Timestamp, NonceStr, Signature },
                }
            })
        })

        WxsdkRewireAPI.__Rewire__('getPayConfig', () => {
            return Promise.resolve({
                data: {
                    data: { AppId, Timestamp, NonceStr, Signature },
                }
            })
        })

        global.WeixinJSBridge = {

        }

        global.wx = {
            onerror: null,
            onready: null,

            config (...args) {
                config(...args)
                setTimeout(() => {
                    if (global.window.__wx === FLAG_FAILURE) {
                        return this.onerror({ errMsg: 'message' })
                    }
                    this.onready()
                }, 5)
            },
            getLocation (options) {
                const { success, fail } = options
                setTimeout(() => {
                    if (global.window.__wx === FLAG_FAILURE) {
                        return fail({ errMsg: 'message' })
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
        }
    })

    afterEach(() => {
        sinon.restore()
        WxsdkRewireAPI.__ResetDependency__('getWxConfig')
        WxsdkRewireAPI.__ResetDependency__('getPayConfig')
        global.wx = undefined
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
            global.window.__wx = FLAG_FAILURE
            wxConfig(true, 'flag')
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err.message, '签名失败; message')
                    global.window.__wx = undefined
                    done()
                })
        })
    })

    describe('wxSave', () => {
        let originWindow

        before(() => {
            originWindow = global.window
            global.window = {
                location: {
                    href: 'before#after'
                },
            }
        })

        after(() => {
            global.window = originWindow
        })

        it('默认获取浏览器地址', () => {
            const url = wxSave()
            assert.strictEqual(url, 'before')
        })

        it('安卓环境 + url = href', () => {
            global.window.__wxjs_is_wkwebview = false
            wxSave('hello')

            const url = wxSave()
            assert.strictEqual(url, 'before')

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

    describe('wxLocation', () => {
        it('获取当前wxConfig', async () => {
            // console.log(global.window.__wx)
            // const fake = sinon.fake.resolves()
            // WxsdkRewireAPI.__Rewire__('getPayConfig', fake)
            // await wxLocation()
            // assert.ok(fake.calledWithExactly(false))
            // WxsdkRewireAPI.__ResetDependency__('getWxConfig')
        })

        it('wx.getLocation参数格式', () => {})

        it('wx.getLocation异常', () => {})

        it('parseGeocoder接收wx.getLocation返回参数', () => {})

        it('返回parseGeocoder的结果', () => {})
    })

    describe('wxShare', () => {})

    describe('wxpay', () => {
        it('onBridgeReady:success', () => {})

        it('onBridgeReady:error', () => {})

        it('getPayConfig:error', () => {})
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
