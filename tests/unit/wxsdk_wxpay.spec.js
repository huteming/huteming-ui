import { __RewireAPI__ as WxsdkRewireAPI, wxpay } from 'web-util/wxsdk/src/main'
import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
const FLAG_FAILURE = 'failure'
const FLAG_SUCCESS = 'success'
const resGetPayConfig = {
    b: 'a',
    j: 'e',
}
const mockError = new Error('this is an error')

describe('wxsdk > wxpay', () => {
    let mockInvoke

    beforeEach(async () => {
        mockInvoke = sinon.fake()

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

        window.WeixinJSBridge = {
            invoke (str, obj, fn) {
                mockInvoke(...arguments)
                if (global.errInvoke === FLAG_FAILURE) {
                    return fn({ err_msg: 'invoke error' })
                }
                fn({ err_msg: 'get_brand_wcpay_request:ok' })
            },
        }
    })

    afterEach(() => {
        sinon.restore()
        WxsdkRewireAPI.__ResetDependency__('getPayConfig')
        global.__wx = FLAG_SUCCESS
        global.errInvoke = FLAG_SUCCESS
        window.WeixinJSBridge = null
    })

    it('success', async () => {
        await wxpay()

        const [first, second] = mockInvoke.getCall(0).args
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
