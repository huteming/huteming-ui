import errorInterceptor from '../src/onResponseError'
import assert from 'assert'
import axios, { AxiosInstance } from 'axios'
import getOptions from '../src/getOptions'
import moxios from 'moxios'

describe('request > onResponseError', () => {
    let axiosInstance: any
    beforeEach(() => {
        axiosInstance = axios.create(getOptions({}))
        axiosInstance.interceptors.response.use(undefined, errorInterceptor(axiosInstance, getOptions({})))
        moxios.install(axiosInstance)

        moxios.stubRequest('http://www.somesite.com/success', {
            status: 200,
            response: { flag: 1, msg: '', data: {} },
        })
        // moxios.stubRequest('http://www.somesite.com/network', {
        //     status: 500,
        // })
        moxios.stubRequest('http://www.somesite.com/retry', {
            status: 400,
        })
    })
    afterEach(() => {
        moxios.uninstall(axiosInstance)
    })

    it('取消请求', (done) => {
        const CancelToken = axios.CancelToken
        let cancel: any

        axiosInstance.get('http://www.somesite.com/success', {
            cancelToken: new CancelToken(function executor(c) {
                // executor 函数接收一个 cancel 函数作为参数
                cancel = c
            }),
        })
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch((err: any) => {
                assert.strictEqual(err.message, 'nonHandleError:请求取消')
                done()
            })
        cancel()
    })

    it('network error', (done) => {
        const mockError = {
            message: 'Network Error',
            config: {},
        }
        axiosInstance('http://www.somesite.com/network', {
            adapter (config: any) {
                return Promise.reject(mockError)
            }
        })
            .then((res: any) => {
                done(new Error('期望异常'))
            })
            .catch((err: any) => {
                assert.strictEqual(err, mockError)
                done()
            })
    })

    it('config不存在', (done) => {
        const mockError = {
            config: null,
        }
        axiosInstance('http://www.somesite.com/network', {
            adapter (config: any) {
                return Promise.reject(mockError)
            }
        })
            .then((res: any) => {
                done(new Error('期望异常'))
            })
            .catch((err: any) => {
                assert.strictEqual(err, mockError)
                done()
            })
    })

    it('重发请求', done => {
        axiosInstance('http://www.somesite.com/retry', {
            jhsyRetryDelay: 0,
        })
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch((err: any) => {
                assert.strictEqual(err.config.url, 'http://www.somesite.com/retry')
                assert.strictEqual(err.config.jhsyRetryCount, 2)
                done()
            })
    })
})
