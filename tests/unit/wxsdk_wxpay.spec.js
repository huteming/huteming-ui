import { __RewireAPI__ as WxsdkRewireAPI, wxpay } from 'web-util/wxsdk/src/main'
import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
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
const mockError = new Error('this is an error')

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
            if (global.__wx === FLAG_FAILURE) {
                return Promise.reject(mockError)
            }
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
                    if (global.errInvoke === FLAG_FAILURE) {
                        return fn({ err_msg: 'invoke error' })
                    }
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
        global.errInvoke = FLAG_SUCCESS
        global.window = originWindow
    })

    describe('wxpay', () => {
        it('success', async () => {
            await wxpay()
            const spyCall = invoke.getCall(0)
            const [first, second] = spyCall.args
            assert.strictEqual(first, 'getBrandWCPayRequest')
            assert.deepStrictEqual(second, resGetPayConfig)
        })

        it('window.WeixinJSBridge === undefined && document.addEventListener', async () => {
            const _save = window.WeixinJSBridge
            window.WeixinJSBridge = undefined
            const _saveListener = document.addEventListener

            const myEmitter = new EventEmitter()
            document.addEventListener = (name, fn) => {
                myEmitter.on(name, fn)
            }

            const fake = sinon.fake()
            WxsdkRewireAPI.__Rewire__('onBridgeReady', (data, resolve) => {
                resolve()
                return fake
            })

            await wxpay()
            myEmitter.emit('WeixinJSBridgeReady')
            assert.ok(fake.called)

            window.WeixinJSBridge = _save
            document.addEventListener = _saveListener
            WxsdkRewireAPI.__ResetDependency__('onBridgeReady')
        })

        it('window.WeixinJSBridge === undefined && document.attachEvent', async () => {
            const myEmitter = new EventEmitter()

            const _save = window.WeixinJSBridge
            const _saveListener = document.addEventListener
            const _saveAttach = document.attachEvent
            window.WeixinJSBridge = undefined
            document.addEventListener = null
            document.attachEvent = (name, fn) => {
                myEmitter.on(name, fn)
            }

            const fake = sinon.fake()
            WxsdkRewireAPI.__Rewire__('onBridgeReady', (data, resolve) => {
                resolve()
                return fake
            })

            await wxpay()
            myEmitter.emit('WeixinJSBridgeReady')
            myEmitter.emit('onWeixinJSBridgeReady')
            assert.strictEqual(fake.callCount, 2)

            window.WeixinJSBridge = _save
            document.addEventListener = _saveListener
            document.attachEvent = _saveAttach
            WxsdkRewireAPI.__ResetDependency__('onBridgeReady')
        })

        it('window.WeixinJSBridge,addEventListener,attachEvent 不存在', (done) => {
            const _save = window.WeixinJSBridge
            const _saveListener = document.addEventListener
            const _saveAttach = document.attachEvent
            window.WeixinJSBridge = undefined
            document.addEventListener = null
            document.attachEvent = null

            wxpay()
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err.message, '支付失败')
                    done()
                })
                .finally(() => {
                    window.WeixinJSBridge = _save
                    document.addEventListener = _saveListener
                    document.attachEvent = _saveAttach
                })
        })

        it('getPayConfig 异常', done => {
            global.__wx = FLAG_FAILURE
            wxpay()
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err, mockError)
                    done()
                })
        })

        it('onBridgeReady 异常', done => {
            global.errInvoke = FLAG_FAILURE
            wxpay()
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err.message, '支付失败: invoke error')
                    done()
                })
        })
    })
})
