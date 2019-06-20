import Interceptor, { __RewireAPI__ as WxsdkRewireAPI } from 'web-util/request/src/interceptors'
import assert from 'assert'
import sinon from 'sinon'

describe('request > interceptors', () => {
    afterEach(() => {
        sinon.restore()
    })

    describe('resSuccess', () => {
        it('七牛上传 success', async () => {
            const int = new Interceptor()
            const res = {
                data: {
                    hash: 'hash',
                },
                config: {
                    url: 'up.qbox.me',
                },
            }
            const data = await int.resSuccess(res)

            assert.strictEqual(data, res)
        })

        it('七牛上传 error && 调用definedPrompt', (done) => {
            const int = new Interceptor()
            const res = {
                data: {
                    hash: '',
                },
                config: {
                    url: 'up.qbox.me',
                },
            }
            const mockPrompt = sinon.fake()
            global.window.definedPrompt = mockPrompt

            int.resSuccess(res)
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    const [msg, fn, config] = mockPrompt.getCall(0).args
                    assert.strictEqual(msg, '上传失败，刷新页面后重新上传')
                    assert.strictEqual(fn, null)
                    assert.deepStrictEqual(config, { cancelFlag: 'hide' })
                    assert.deepStrictEqual(err, res)
                    done()
                })
                .finally(() => {
                    global.window.definedPrompt = undefined
                })
        })

        it('七牛上传 error && 调用console.error', (done) => {
            const int = new Interceptor()
            const res = {
                data: {
                    hash: '',
                },
                config: {
                    url: 'up.qbox.me',
                },
            }
            const mockLog = sinon.fake()
            sinon.replace(console, 'error', mockLog)

            int.resSuccess(res)
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    const [msg, fn, config] = mockLog.getCall(0).args
                    assert.strictEqual(msg, '上传失败，刷新页面后重新上传')
                    assert.strictEqual(fn, null)
                    assert.deepStrictEqual(config, { cancelFlag: 'hide' })
                    assert.deepStrictEqual(err, res)
                    done()
                })
        })

        it('flag === 1', async () => {
            const int = new Interceptor()
            const res = {
                data: {
                    flag: 1,
                },
            }
            const data = await int.resSuccess(res)

            assert.strictEqual(data, res)
        })

        it('flag === -1', (done) => {
            const int = new Interceptor()
            const errorMsg = 'an error message'
            const res = {
                data: {
                    flag: -1,
                    msg: errorMsg,
                },
            }
            sinon.replace(console, 'error', sinon.fake())

            int.resSuccess(res)
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err.message, 'nonHandleError:消息类异常')
                    assert.strictEqual(err.flag, -1)
                    done()
                })
        })

        it('flag === -1 && 调用definedToast', (done) => {
            const int = new Interceptor()
            const errorMsg = 'an error message'
            const res = {
                data: {
                    flag: -1,
                    msg: errorMsg,
                },
            }
            const mockToast = sinon.fake()
            global.window.definedToast = mockToast

            int.resSuccess(res)
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(() => {
                    const [_msg] = mockToast.getCall(0).args
                    assert.strictEqual(_msg, errorMsg)
                    done()
                })
                .finally(() => {
                    global.window.definedToast = undefined
                })
        })

        it('flag === -1 && 调用console.error', (done) => {
            const int = new Interceptor()
            const errorMsg = 'an error message'
            const res = {
                data: {
                    flag: -1,
                    msg: errorMsg,
                },
            }
            const mockLog = sinon.fake()
            sinon.replace(console, 'error', mockLog)

            int.resSuccess(res)
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(() => {
                    const [_msg] = mockLog.getCall(0).args
                    assert.strictEqual(_msg, errorMsg)
                    done()
                })
        })

        it('flag === -100', (done) => {
            const int = new Interceptor()
            const errorMsg = 'an error message'
            const res = {
                data: {
                    flag: -100,
                    msg: errorMsg,
                },
            }
            sinon.replace(console, 'error', sinon.fake())

            int.resSuccess(res)
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err.message, 'nonHandleError:未登录')
                    assert.strictEqual(err.flag, -100)
                    done()
                })
        })

        it('flag === -100 && 调用location.replace', (done) => {
            const _accountAlias = ';;;;;;'
            const int = new Interceptor({ _accountAlias })
            const errorMsg = 'an error message'
            const res = {
                data: {
                    flag: -100,
                    msg: errorMsg,
                },
            }
            const originReplace = window.location.replace
            const mockReplace = sinon.fake()
            window.location.replace = mockReplace

            int.resSuccess(res)
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(() => {
                    const [_url] = mockReplace.getCall(0).args
                    assert.strictEqual(_url, `//r1001.jinghao.com/api/redirect/back?backUrl=${encodeURIComponent(window.location.href)}&accountAlias=${_accountAlias}`)
                    done()
                })
                .finally(() => {
                    window.location.replace = originReplace
                })
        })

        it('异常一定执行final', (done) => {
            const int = new Interceptor()
            const errorMsg = 'an error message'
            const res = {
                data: {
                    flag: -200,
                    msg: errorMsg,
                },
            }
            global.window.definedAjaxing = {
                flag: true,
            }

            int.resSuccess(res)
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(() => {
                    assert.strictEqual(global.window.definedAjaxing.flag, false)
                    done()
                })
                .finally(() => {
                    global.window.definedAjaxing = undefined
                })
        })
    })

    describe('resError', () => {
        it('network error', (done) => {
            const int = new Interceptor()
            const mockError = {
                message: 'Network Error',
            }

            int.resError(mockError)
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err, mockError)
                    done()
                })
        })

        it('取消请求', (done) => {
            const int = new Interceptor()
            const mockError = {
                message: '',
            }
            WxsdkRewireAPI.__Rewire__('axios', {
                isCancel () {
                    return true
                },
            })

            int.resError(mockError)
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err.message, 'nonHandleError:请求取消')
                    assert.strictEqual(err.flag, 0)
                    done()
                })
                .finally(() => {
                    WxsdkRewireAPI.__ResetDependency__('axios')
                })
        })

        it('err.config 为空', (done) => {
            const int = new Interceptor()
            const mockError = {
                config: null,
            }

            int.resError(mockError)
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err, mockError)
                    done()
                })
        })

        it('__retryCount >= _retry', (done) => {
            const int = new Interceptor()
            const mockError = {
                config: {
                    __retryCount: 10,
                    _retry: 10,
                },
            }

            int.resError(mockError)
                .then(() => {
                    done(new Error('非期望异常'))
                })
                .catch(err => {
                    assert.strictEqual(err, mockError)
                    done()
                })
        })

        it('重发请求', async () => {
            const mockRes = 'a response message'
            const mockInstance = sinon.fake.resolves(mockRes)
            const int = new Interceptor({}, mockInstance)
            const mockError = {
                config: {
                    _retry: 10,
                    _retryDelay: 5,
                },
            }

            const data = await int.resError(mockError)
            const [config] = mockInstance.getCall(0).args
            assert.deepStrictEqual(config, mockError.config)
            assert.strictEqual(data, mockRes)
        })
    })
})
