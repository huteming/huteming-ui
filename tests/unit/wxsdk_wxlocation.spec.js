import { __RewireAPI__ as WxsdkRewireAPI, wxLocation } from 'web-util/wxsdk/src/main'
import assert from 'assert'
import sinon from 'sinon'
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

    describe('wxLocation', () => {
        const fake = sinon.fake()
        const res = {
            hello: 'hello',
        }

        beforeEach(() => {
            WxsdkRewireAPI.__Rewire__('parseGeocoder', (params) => {
                fake(params)
                return Promise.resolve(res)
            })
        })

        afterEach(() => {
            WxsdkRewireAPI.__ResetDependency__('parseGeocoder')
        })

        it('获取当前wxConfig', async () => {
            await wxLocation()
            assert.ok(config.notCalled)
        })

        it('调用wx.getLocation', async () => {
            await wxLocation()
            assert.ok(location.called)
        })

        it('parseGeocoder接收wx.getLocation返回参数', async () => {
            await wxLocation()
            const spyCall = fake.getCall(0)
            assert.deepStrictEqual(spyCall.args[0], { lat: latitude, lng: longitude, type: 'wgs84ll' })
        })

        it('返回parseGeocoder的结果', async () => {
            const data = await wxLocation()
            assert.strictEqual(data, res)
        })

        it('wx.getLocation 异常', done => {
            global.__wx = FLAG_FAILURE
            wxLocation()
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err.message, '定位失败: location')
                    done()
                })
        })
    })
})
