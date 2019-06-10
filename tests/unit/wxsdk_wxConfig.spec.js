import { __RewireAPI__ as WxsdkRewireAPI, wxConfig, mapApis } from 'web-util/wxsdk/src/main'
import assert from 'assert'
import sinon from 'sinon'

describe('wxsdk > wxConfig', () => {
    let onConfig
    let mockTimeout
    let originTimeout
    const FLAG_FAILURE = 'failure'
    const FLAG_SUCCESS = 'success'
    const AppId = 'AppId'
    const Timestamp = 'Timestamp'
    const NonceStr = 'NonceStr'
    const Signature = 'Signature'

    beforeEach(() => {
        originTimeout = global.setTimeout
        onConfig = sinon.fake()
        mockTimeout = sinon.fake()

        WxsdkRewireAPI.__Rewire__('getWxConfig', () => {
            return Promise.resolve({
                data: {
                    data: { AppId, Timestamp, NonceStr, Signature },
                }
            })
        })

        global.setTimeout = (fn, delay) => {
            mockTimeout(fn, delay)
            fn()
        }

        global.wx = {
            onerror: null,
            onready: null,

            config (...args) {
                onConfig(...args)
                originTimeout(() => {
                    if (global.__wx === FLAG_FAILURE) {
                        return this.onerror({ errMsg: 'config' })
                    }
                    this.onready()
                }, 5)
            },
            error (callback) {
                this.onerror = callback
            },
            ready (callback) {
                this.onready = callback
            },
        }
    })

    afterEach(() => {
        sinon.restore()
        WxsdkRewireAPI.__ResetDependency__('getWxConfig')
        global.wx = null
        global.setTimeout = originTimeout
    })

    it('返回Promise', () => {
        const res = wxConfig()

        assert.ok(res instanceof Promise)
    })

    it('第一个参数为falsy返回相同Promise', () => {
        const res1 = wxConfig()
        const res2 = wxConfig(false)

        assert.strictEqual(res1, res2)
    })

    it('延迟800ms resolve promise', async () => {
        await wxConfig(true, 'flag')

        assert.strictEqual(mockTimeout.getCall(0).args[1], 800)
    })

    it('空注册', async () => {
        await wxConfig(true, 'flag')

        const actual = onConfig.getCall(0).args[0].jsApiList
        assert.deepStrictEqual(actual, mapApis.get('default'))
    })

    it('不存在的类型返回空数组', async () => {
        await wxConfig(['hello'], 'flag')

        const actual = onConfig.getCall(0).args[0].jsApiList
        assert.deepStrictEqual(actual, mapApis.get('default'))
    })

    it('注册image', async () => {
        await wxConfig('image', 'flag')

        const actual = onConfig.getCall(0).args[0].jsApiList
        const expect = [].concat(mapApis.get('default'), mapApis.get('image'))
        assert.deepStrictEqual(actual, expect)
    })

    it('注册location', async () => {
        await wxConfig('location', 'flag')

        const actual = onConfig.getCall(0).args[0].jsApiList
        const expect = [].concat(mapApis.get('default'), mapApis.get('location'))
        assert.deepStrictEqual(actual, expect)
    })

    it('注册location && 注册image', async () => {
        await wxConfig(['location', 'image'], 'flag')

        const actual = onConfig.getCall(0).args[0].jsApiList
        const expect = [].concat(mapApis.get('default'), mapApis.get('location'), mapApis.get('image'))
        assert.deepStrictEqual(actual, expect)
    })

    it('wx.confing参数', async () => {
        await wxConfig(true, 'flag')

        const actual = onConfig.getCall(0).args[0]
        const expect = {
            debug: false,
            appId: AppId,
            timestamp: Timestamp,
            nonceStr: NonceStr,
            signature: Signature,
            jsApiList: mapApis.get('default'),
        }
        assert.deepStrictEqual(actual, expect)
    })

    it('注册异常捕获', done => {
        global.__wx = FLAG_FAILURE
        wxConfig(true, 'flag')
            .then(() => {
                done(new Error('非期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err.message, '签名失败: config')
                done()
            })
            .finally(() => {
                // 因为 wxConfig 是一个闭包，这里还原内部 Promise 为 resolve 状态
                global.__wx = FLAG_SUCCESS
                wxConfig(true, 'flag')
            })
    })
})
