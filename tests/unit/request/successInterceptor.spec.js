import successInterceptor from 'web-util/request/src/successInterceptor'
import assert from 'assert'
import sinon from 'sinon'

describe('request > successInterceptor', () => {
    afterEach(() => {
        sinon.restore()
    })

    it('七牛上传 success', async () => {
        const mockRes = {
            data: {
                hash: 'hash',
            },
            config: {
                url: 'up.qbox.me',
            },
        }
        const res = await successInterceptor.call({}, mockRes)
        assert.strictEqual(res, mockRes)
    })

    it('七牛上传 error', (done) => {
        const mockRes = {
            data: {
                hash: '',
            },
            config: {
                url: 'up.qbox.me',
            },
        }

        successInterceptor.call({}, mockRes)
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err, mockRes)
                done()
            })
    })

    it('flag === 1', async () => {
        const mockRes = {
            data: {
                flag: 1,
            },
        }
        const res = await successInterceptor.call({}, mockRes)
        assert.strictEqual(res, mockRes)
    })

    it('flag === -1', (done) => {
        const errorMsg = 'an error message'
        const mockLog = sinon.fake()
        const mockRes = {
            data: {
                flag: -1,
                msg: errorMsg,
            },
        }
        sinon.replace(console, 'error', mockLog)

        successInterceptor.call({}, mockRes)
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err.message, 'nonHandleError:消息类异常')
                assert.strictEqual(err.flag, -1)
                assert.deepStrictEqual(mockLog.getCall(0).args, [errorMsg])
                done()
            })
    })

    it('flag === -1 && 调用definedToast', (done) => {
        const errorMsg = 'an error message'
        const mockRes = {
            data: {
                flag: -1,
                msg: errorMsg,
            },
        }
        const mockToast = sinon.fake()
        global.window.definedToast = mockToast

        successInterceptor.call({}, mockRes)
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(() => {
                assert.deepStrictEqual(mockToast.getCall(0).args, [errorMsg])
                done()
            })
            .finally(() => {
                global.window.definedToast = undefined
            })
    })

    it('flag === -100', (done) => {
        const errorMsg = 'an error message'
        const mockRes = {
            data: {
                flag: -100,
                msg: errorMsg,
            },
            config: {
                baseURL: 'b',
            },
        }
        const mockOptions = {
            jhsyAccountAlias: 'a',
        }
        const mockReplace = sinon.fake()
        const originReplace = window.location.replace
        window.location.replace = mockReplace

        successInterceptor.call({ options: mockOptions }, mockRes)
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err.message, 'nonHandleError:未登录')
                assert.strictEqual(err.flag, -100)
                assert.deepStrictEqual(
                    mockReplace.getCall(0).args,
                    [`b/api/redirect/back?backUrl=${encodeURIComponent(window.location.href)}&accountAlias=a`]
                )
                done()
            })
            .finally(() => {
                window.location.replace = originReplace
            })
    })

    it('异常一定执行final', (done) => {
        const errorMsg = 'an error message'
        const mockRes = {
            data: {
                flag: -200,
                msg: errorMsg,
            },
        }
        window.definedAjaxing = {
            flag: true,
        }

        successInterceptor.call({}, mockRes)
            .then(() => {
                done(new Error('非期望异常'))
            })
            .catch(() => {
                assert.strictEqual(window.definedAjaxing.flag, false)
                done()
            })
            .finally(() => {
                window.definedAjaxing = undefined
            })
    })
})
