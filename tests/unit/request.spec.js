import sinon from 'sinon'
import qs from 'qs'
import assert from 'assert'
import axios from 'axios'
import moxios from 'moxios'

const href = 'http://localhost'
const replace = sinon.fake()
let requestFactory = null

describe('request', () => {
    let request
    let resSuccess
    let resError
    let toast
    let message

    beforeEach(() => {
        // eslint-disable-next-line
        global.window = {
            location: {
                href,
                replace,
            },
        }

        requestFactory = require('web-util/request/index.js').default
        resSuccess = sinon.fake()
        resError = sinon.fake()
        toast = sinon.fake()
        message = sinon.fake()
        request = requestFactory({
            _resSuccess: resSuccess,
            _resError: resError,
            _toast: toast,
            _message: message,
            _retry: 1,
            _retryDelay: 500,
            _accountAlias: '_accountAlias',
        })
        moxios.install(request)

        moxios.stubRequest('http://www.somesite.com/error', {
            status: 400,
            response: { message: 'invalid data' },
        })

        moxios.stubRequest('http://www.somesite.com/success', {
            status: 200,
            response: { flag: 1, msg: '', data: {} },
        })

        moxios.stubRequest('http://www.somesite.com/1', {
            status: 200,
            response: { flag: -1, msg: '消息异常', data: {} },
        })

        moxios.stubRequest('http://www.somesite.com/100', {
            status: 200,
            response: { flag: -100, msg: '', data: {} },
        })

        moxios.stubRequest('http://up.qbox.me', {
            status: 200,
            response: { hash: '' },
        })
    })

    afterEach(() => {
        global.window = undefined
        moxios.uninstall(request)
    })

    describe('options', () => {
        it('resSuccess', done => {
            request.get('http://www.somesite.com/success')
                .then(res => {
                    assert.ok(resSuccess.calledWith(res))
                    done()
                })
                .catch(done)
        })

        it('resError', done => {
            request.get('http://www.somesite.com/error')
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.ok(resError.calledWith(err))
                    done()
                })
        })

        it('toast', done => {
            request.get('http://www.somesite.com/1')
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(() => {
                    assert.ok(toast.calledWith('消息异常'))
                    done()
                })
        })

        it('message', done => {
            request.get('http://up.qbox.me')
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(() => {
                    assert.ok(message.calledWith('上传失败，刷新页面后重新上传'))
                    done()
                })
        })

        it('accountAlias', done => {
            request.get('http://www.somesite.com/100')
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(() => {
                    assert.ok(replace.calledWith(`//r1001.jinghao.com/api/redirect/back?backUrl=${encodeURIComponent(href)}&accountAlias=_accountAlias`))
                    done()
                })
        })

        it('retry', done => {
            const start = Date.now()
            request.get('http://www.somesite.com/error')
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    const end = Date.now()
                    assert.ok(end - start >= 500)
                    assert.ok(end - start <= 600)
                    assert.strictEqual(err.config.__retryCount, 1, '重发次数错误')
                    done()
                })
        })
    })

    describe('转换请求体格式', () => {
        it('不处理空数据体', done => {
            const data = null
            request.post('http://www.somesite.com/success', data)
                .then(res => {
                    assert.strictEqual(res.config.data, null)
                    done()
                })
                .catch(done)
        })

        it('default! json to string', done => {
            const data = {
                a: 'hello',
            }
            request.post('http://www.somesite.com/success', data)
                .then(res => {
                    assert.strictEqual(res.config.data, qs.stringify({ a: 'hello' }))
                    assert.strictEqual(res.config.headers['Content-Type'], 'application/x-www-form-urlencoded')
                    done()
                })
                .catch(done)
        })

        it('json to string', done => {
            const data = {
                _type: 'string',
                a: 'hello',
            }
            request.post('http://www.somesite.com/success', data)
                .then(res => {
                    assert.strictEqual(res.config.data, qs.stringify({ a: 'hello' }))
                    assert.strictEqual(res.config.headers['Content-Type'], 'application/x-www-form-urlencoded')
                    done()
                })
                .catch(done)
        })

        it('json to json', done => {
            const data = {
                _type: 'json',
                a: 'hello',
            }
            request.post('http://www.somesite.com/success', data)
                .then(res => {
                    assert.strictEqual(res.config.data, JSON.stringify({ a: 'hello' }))
                    assert.strictEqual(res.config.headers['Content-Type'], 'application/json')
                    done()
                })
                .catch(done)
        })

        it('json to form', done => {
            const data = {
                _type: 'form',
                a: 'hello',
            }
            request.post('http://www.somesite.com/success', data)
                .then(res => {
                    assert.ok(res.config.data instanceof FormData)
                    assert.ok(!res.config.data.get('_type'))
                    assert.strictEqual(res.config.data.get('a'), 'hello')
                    assert.strictEqual(res.config.headers['Content-Type'], 'multipart/form-data')
                    done()
                })
                .catch(done)
        })

        it('string 不处理', done => {
            const data = qs.stringify({
                a: 'hello',
            })
            request.post('http://www.somesite.com/success', data)
                .then(res => {
                    assert.strictEqual(res.config.data, qs.stringify({ a: 'hello' }))
                    assert.strictEqual(res.config.headers['Content-Type'], 'application/x-www-form-urlencoded')
                    done()
                })
                .catch(done)
        })

        it('FormData 不处理', done => {
            const data = new FormData()
            data.append('a', 'hello')
            request.post('http://www.somesite.com/success', data)
                .then(res => {
                    assert.ok(res.config.data instanceof FormData)
                    assert.strictEqual(res.config.data.get('a'), 'hello')
                    assert.strictEqual(res.config.headers['Content-Type'], 'multipart/form-data')
                    done()
                })
                .catch(done)
        })
    })

    it('取消请求,返回自定义异常', done => {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()

        request.get('http://www.somesite.com/success', {}, {
            cancelToken: source.token,
        })
            .then(() => {
                done(new Error('非期望异常'))
            })
            .catch(err => {
                if (err.message === 'nonHandleError:请求取消') {
                    return done()
                }
                done(err)
            })

        source.cancel('Operation canceled by the user.')
    })
})
