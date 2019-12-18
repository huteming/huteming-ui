import _onResponse, { __RewireAPI__ } from '../src/onResponse'
import assert from 'assert'
import sinon from 'sinon'
import getOptions from '../src/getOptions'
import Axios, { AxiosResponse } from 'axios'
const onResponse = _onResponse(Axios.create(), getOptions({}))

function createResponse (custom = {}) {
    return Object.assign({
        data: {},
        status: 200,
        statusText: '',
        headers: {},
        config: {},
    }, custom)
}

describe('request > onResponse', () => {
    afterEach(() => {
        sinon.restore()
    })

    it('七牛上传 success', async () => {
        const mockRes = createResponse({
            data: {
                hash: 'hash',
            },
            config: {
                url: 'up.qbox.me',
            },
        })
        const res = await onResponse(mockRes)
        assert.strictEqual(res, mockRes)
    })

    it('七牛上传 error', (done) => {
        const mockRes = createResponse({
            data: {
                hash: '',
            },
            config: {
                url: 'up.qbox.me',
            },
        })

        onResponse(mockRes)
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err, mockRes)
                done()
            })
    })

    it('flag === 1', async () => {
        const mockRes = createResponse({
            data: {
                flag: 1,
            },
        })
        const res = await onResponse(mockRes)
        assert.strictEqual(res, mockRes)
    })

    it('flag === -1', (done) => {
        const mockRes = createResponse({
            data: {
                flag: -1,
                msg: 'hello',
            },
        })

        onResponse(mockRes)
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err.message, 'nonHandleError:消息类异常')
                assert.strictEqual(err.flag, -1)
                assert.strictEqual(err.msg, 'hello')
                done()
            })
    })

    it('flag === -100', (done) => {
        const mockRes = createResponse({
            data: {
                flag: -100,
                msg: 'hello',
            },
        })

        onResponse(mockRes)
            .then(() => {
                done(new Error('期望异常'))
            })
            .catch(err => {
                assert.strictEqual(err.message, 'nonHandleError:未登录')
                assert.strictEqual(err.flag, -100)
                assert.strictEqual(err.msg, 'hello')
                done()
            })
    })

    it('异常一定执行final', (done) => {
        const mockFinal = sinon.fake()
        __RewireAPI__.__Rewire__('final', mockFinal)
        const mockRes = createResponse({
            data: {
                flag: -200,
                msg: 'hello',
            },
        })

        onResponse(mockRes)
            .then(() => {
                done(new Error('非期望异常'))
            })
            .catch(() => {
                assert.ok(mockFinal.called)
                done()
            })
            .finally(() => {
                __RewireAPI__.__ResetDependency__('final')
            })
    })
})
