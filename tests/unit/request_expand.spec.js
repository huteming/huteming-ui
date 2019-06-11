import { __RewireAPI__ as WxsdkRewireAPI, requestJsonp, requestGet } from 'web-util/request/src/expand'
import assert from 'assert'
import sinon from 'sinon'
import qs from 'qs'

describe('request > expand', () => {
    describe('requestJsonp', () => {
        let fakeJsonp
        const errorMsg = 'this is an error message'
        const successMsg = 'this is an success message'
        const res = { msg: successMsg }

        beforeEach(() => {
            fakeJsonp = sinon.fake()

            WxsdkRewireAPI.__Rewire__('jsonp', (url, config, callback) => {
                fakeJsonp(url, config, callback)
                if (global.__jsonp) {
                    return callback(new Error(errorMsg))
                }
                callback(null, res)
            })
        })

        afterEach(() => {
            WxsdkRewireAPI.__ResetDependency__('jsonp')
        })

        it('params 为空 && config 为空', async () => {
            const url = 'http://baidu.com?'
            await requestJsonp(url)

            const [_url, _config] = fakeJsonp.getCall(0).args
            assert.strictEqual(_url, url)
            assert.deepStrictEqual(_config, {})
        })

        it('params 不为空', async () => {
            const url = 'http://baidu.com'
            const params = { a: 'a', b: 'b' }
            await requestJsonp(url, params)

            const [_url] = fakeJsonp.getCall(0).args
            assert.strictEqual(_url, `${url}?${qs.stringify(params)}`)
        })

        it('config 不为空', async () => {
            const url = 'http://baidu.com'
            const params = { a: 'a', b: 'b' }
            const config = { c: 'c', d: 'd' }
            await requestJsonp(url, params, config)

            const [, _config] = fakeJsonp.getCall(0).args
            assert.deepStrictEqual(_config, config)
        })

        it('resolve 返回data', async () => {
            const url = 'http://baidu.com'
            const data = await requestJsonp(url)

            assert.deepStrictEqual(data, res)
        })

        it('jsonp异常', (done) => {
            global.__jsonp = true
            const url = 'http://baidu.com'
            requestJsonp(url)
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err.message, errorMsg)
                    done()
                })
                .finally(() => {
                    global.__jsonp = undefined
                })
        })
    })

    describe('requestGet', () => {
        it('返回 function', () => {
            const res = requestGet()

            assert.strictEqual(typeof res, 'function')
        })

        it('url 不处理', () => {
            const url = 'hhhh'
            const mockGet = sinon.fake()
            const fn = requestGet(mockGet)
            fn(url)

            const [_url] = mockGet.getCall(0).args
            assert.deepStrictEqual(_url, url)
        })

        it('params 为第二个参数params属性', () => {
            const mockGet = sinon.fake()
            const fn = requestGet(mockGet)
            const params = { a: 'a' }
            fn('hhh', params)

            const [, headers] = mockGet.getCall(0).args
            assert.deepStrictEqual(headers.params, params)
        })

        it('config 会合并到第二个参数中', () => {
            const mockGet = sinon.fake()
            const fn = requestGet(mockGet)
            const config = { a: 'a' }
            fn('hhh', null, config)

            const [, headers] = mockGet.getCall(0).args
            assert.strictEqual(headers.a, config.a)
        })

        it('返回回调函数的结果', () => {
            const res = 'this is a test message'
            const mockGet = sinon.fake.returns(res)
            const fn = requestGet(mockGet)
            const data = fn('hhh')

            assert.strictEqual(data, res)
        })
    })
})
