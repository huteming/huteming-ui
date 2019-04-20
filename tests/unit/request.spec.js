import sinon from 'sinon'
import qs from 'qs'
import assert from 'assert'

const href = 'http://localhost'
const replace = sinon.fake()
let requestFactory = null

describe('request', () => {
    beforeEach(() => {
        // eslint-disable-next-line
        global.window = {
            location: {
                href,
                replace,
            },
        }

        requestFactory = require('web-util/request/index.js').default
    })

    describe('options', () => {
        it('resSuccess, resError', async () => {
            const resSuccess = sinon.fake()
            const resError = sinon.fake()
            const error = new Error('expect error but got success')
            const res = {
                data: {
                    flag: 1,
                },
            }

            const request = requestFactory({
                resSuccess,
                resError,
            })

            const { fulfilled, rejected } = request.interceptors.response.handlers[0]

            fulfilled(res)
            assert(resSuccess.calledWith(res))

            try {
                await rejected(error)
                throw error
            } catch (err) {
                assert(resError.calledWith(error))
            }
        })

        it('toast', async () => {
            const toast = sinon.fake()
            const msg = 'hello msg'
            const res = {
                data: {
                    flag: -1,
                    msg,
                },
            }
            const request = requestFactory({
                toast,
            })

            const { fulfilled } = request.interceptors.response.handlers[0]

            try {
                fulfilled(res)
                throw new Error('expect err but got success')
            } catch (err) {
                assert(toast.calledWith(msg))
                assert(err === res)
            }
        })

        it('accountAlias', async () => {
            const accountAlias = 'accountAlias'
            const res = {
                data: {
                    flag: -100,
                },
            }
            const request = requestFactory({
                accountAlias,
            })

            const { fulfilled } = request.interceptors.response.handlers[0]

            try {
                fulfilled(res)
                throw new Error('expect err but got success')
            } catch (err) {
                assert(replace.calledWith(`//r1001.jinghao.com/api/redirect/back?backUrl=${encodeURIComponent(href)}&accountAlias=${accountAlias}`))
                assert.strictEqual(err, res)
            }
        })
    })

    describe('requestTransform', () => {
        let fulfilled = () => {}

        before(() => {
            const request = requestFactory()
            fulfilled = request.interceptors.request.handlers[0].fulfilled
        })

        it('empty', () => {
            const config = {
                data: null,
                others: 'others',
            }

            const res = fulfilled(config)

            assert(res === config)
        })

        it('default', async () => {
            const data = {
                a: 'hello',
            }

            const res = fulfilled({
                data,
                headers: {},
            })

            // data
            assert(res.data === qs.stringify(data))

            // headers
            assert(res.headers['Content-Type'] === 'application/x-www-form-urlencoded')
        })

        it('json', async () => {
            const data = {
                _type: 'json',
                a: 'hello',
            }

            const res = fulfilled({
                data,
                headers: {},
            })

            // data
            assert(res.data === data)

            // headers
            assert(res.headers['Content-Type'] === 'application/json')
        })

        it('form', async () => {
            const data = {
                _type: 'form',
                a: 'hello',
            }

            const res = fulfilled({
                data,
                headers: {},
            })

            // data
            assert(res.data instanceof FormData)
            assert(!res.data.get('_type'))
            assert(res.data.get('a') === 'hello')

            // headers
            assert(res.headers['Content-Type'] === 'multipart/form-data')
        })

        it('string', async () => {
            const data = qs.stringify({
                a: 'hello',
            })

            const res = fulfilled({
                data,
                headers: {},
            })

            // data
            assert(res.data === data)

            // headers
            assert(res.headers['Content-Type'] === 'application/x-www-form-urlencoded')
        })
    })
})
