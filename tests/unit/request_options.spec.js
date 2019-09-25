import sinon from 'sinon'
import assert from 'assert'
import moxios from 'moxios'
const { testURL } = require('../../jest.config')

let requestFactory = null

describe('request > options', () => {
    let mockReplace
    let originReplace
    let request
    let resSuccess
    let resError
    let reqSuccess

    describe('callback is a function', () => {

        beforeEach(() => {
            mockReplace = sinon.fake()
            originReplace = window.location.replace
            window.location.replace = mockReplace

            requestFactory = require('web-util/request/index').default
            resSuccess = sinon.fake()
            resError = sinon.fake()
            reqSuccess = sinon.fake()
            request = requestFactory({
                _resSuccess: resSuccess,
                _resError: resError,
                _reqSuccess: reqSuccess,
                _retry: 1,
                _retryDelay: 5,
                _accountAlias: '_accountAlias',
                timeout: 5,
            })
            moxios.install(request)

            moxios.stubRequest('http://www.somesite.com/error', {
                status: 400,
                response: { message: 'invalid data' },
            })

            moxios.stubRequest(/http:\/\/www.somesite.com\/success.*/, {
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
            window.location.replace = originReplace
            moxios.uninstall(request)
        })

        it('reqSuccess', done => {
            const data = {
                hello: 'world',
            }
            request.post('http://www.somesite.com/success', data)
                .then(res => {
                    const spyCall = reqSuccess.getCall(0)
                    res.config.data = JSON.stringify(data)
                    assert.deepStrictEqual(spyCall.args[0], res.config)
                    done()
                })
                .catch(done)
        })

        it('resSuccess', done => {
            request.find('http://www.somesite.com/success')
                .then(res => {
                    assert.ok(resSuccess.calledWith(res))
                    done()
                })
                .catch(done)
        })

        it('resError', done => {
            request.find('http://www.somesite.com/error')
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.ok(resError.calledWith(err))
                    done()
                })
        })
        it('accountAlias', done => {
            request.find('http://www.somesite.com/100')
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(() => {
                    const replaceURL = `//r1001.jinghao.com/api/redirect/back?backUrl=${encodeURIComponent(testURL)}&accountAlias=_accountAlias`
                    const [actualURL] = mockReplace.getCall(0).args
                    assert.strictEqual(actualURL, replaceURL)
                    done()
                })
        })

        it('retry', done => {
            request.find('http://www.somesite.com/error')
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err.config.__retryCount, 1, '重发次数错误')
                    done()
                })
        })
    })

    describe('callback is not a function', () => {
        beforeEach(() => {
            mockReplace = sinon.fake()
            originReplace = window.location.replace
            window.location.replace = mockReplace

            requestFactory = require('web-util/request/index').default
            resSuccess = sinon.fake()
            resError = sinon.fake()
            reqSuccess = sinon.fake()
            request = requestFactory({
                _resSuccess: null,
                _resError: null,
                _reqSuccess: null,
                _retry: 0,
                _retryDelay: 5,
                timeout: 5,
            })
            moxios.install(request)

            moxios.stubRequest('http://www.somesite.com/error', {
                status: 400,
                response: { message: 'invalid data' },
            })

            moxios.stubRequest(/http:\/\/www.somesite.com\/success.*/, {
                status: 200,
                response: { flag: 1, msg: '', data: {} },
            })
        })

        afterEach(() => {
            window.location.replace = originReplace
            moxios.uninstall(request)
        })

        it('reqSuccess', done => {
            const data = {
                hello: 'world',
            }
            request.post('http://www.somesite.com/success', data)
                .then(() => {
                    assert.strictEqual(reqSuccess.callCount, 0)
                    done()
                })
                .catch(done)
        })

        it('resSuccess', done => {
            request.find('http://www.somesite.com/success')
                .then(() => {
                    assert.strictEqual(resSuccess.callCount, 0)
                    done()
                })
                .catch(done)
        })

        it('resError', done => {
            request.find('http://www.somesite.com/error')
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(() => {
                    assert.strictEqual(resError.callCount, 0)
                    done()
                })
        })
    })

    describe('更新实例', () => {
        it('不提供options，获取旧实例', () => {
            requestFactory = require('web-util/request/index').default

            const ins1 = requestFactory()
            const ins2 = requestFactory()

            assert.strictEqual(ins1, ins2)
        })

        it('options不同，实例不同', () => {
            requestFactory = require('web-util/request/index').default

            const ins1 = requestFactory({})
            const ins2 = requestFactory({})

            assert.notStrictEqual(ins1, ins2)
        })
    })
})
