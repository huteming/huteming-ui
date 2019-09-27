import errorInterceptor, { __RewireAPI__ as RewireAPI } from 'web/@util/request/src/errorInterceptor'
import assert from 'assert'

describe('request > errorInterceptor', () => {
    it('取消请求', (done) => {
        const mockError = {
            message: '',
        }
        RewireAPI.__Rewire__('axios', {
            isCancel () {
                return true
            },
        })

        errorInterceptor(mockError)
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err.message, 'nonHandleError:请求取消')
                assert.strictEqual(err.flag, 0)
                done()
            })
            .finally(() => {
                RewireAPI.__ResetDependency__('axios')
            })
    })

    it('network error', (done) => {
        const mockError = {
            message: 'Network Error',
        }

        errorInterceptor(mockError)
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err, mockError)
                done()
            })
    })

    it('err.config 为空', (done) => {
        const mockError = {
            config: null,
        }

        errorInterceptor(mockError)
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err, mockError)
                done()
            })
    })

    it('重发请求', done => {
        const mockError = {
            config: {
                jhsyRetryCount: 0,
                jhsyRetry: 1,
                jhsyRetryDelay: 1000,
                config: {
                    jhsyRetryCount: 1,
                    jhsyRetry: 1,
                    jhsyRetryDelay: 1000,
                },
            },
        }
        RewireAPI.__Rewire__('sleep', function () {
            new Promise((resolve) => setTimeout(resolve))
        })
        errorInterceptor.call({ instance: errorInterceptor }, mockError)
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err, mockError.config)
                assert.strictEqual(mockError.config.jhsyRetryCount, 1)
                done()
            })
            .finally(() => {
                RewireAPI.__ResetDependency__('sleep')
            })
    })
})
