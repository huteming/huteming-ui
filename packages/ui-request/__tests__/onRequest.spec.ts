import assert from 'assert'
import _onRequest from '../src/onRequest'
import qs from 'qs'
import axios from 'axios'
import getOptions from '../src/getOptions'
const onRequest = _onRequest(axios.create(), getOptions({}))

describe('request > onRequest', () => {
    it('不处理空数据体', () => {
        const options = getOptions({
            data: null,
        })
        const res = onRequest(options)
        assert.strictEqual(res, options)
        assert.strictEqual(res.data, null)
    })

    it('string 不处理', () => {
        const mockConfig = getOptions({
            headers: {},
            data: 'hello',
        })
        const res = onRequest(mockConfig)
        assert.strictEqual(res.data, 'hello')
        assert.strictEqual(res.headers['Content-Type'], 'application/x-www-form-urlencoded')
    })

    it('FormData 不处理', () => {
        const mockData = new FormData()
        const mockConfig = getOptions({
            headers: {},
            data: mockData,
        })
        const res = onRequest(mockConfig)
        assert.strictEqual(res.data, mockData)
        assert.strictEqual(res.headers['Content-Type'], 'multipart/form-data')
    })

    it('json to json', () => {
        const mockData = getOptions({
            data: {
                _type: 'json',
                a: 'hello',
            },
        })
        const res = onRequest(mockData)
        assert.deepStrictEqual(res.data, { a: 'hello' })
        assert.strictEqual(res.headers['Content-Type'], 'application/json')
    })

    it('json to form', () => {
        const mockConfig = getOptions({
            headers: {},
            data: {
                _type: 'form',
                a: 'hello',
            },
        })
        const res = onRequest(mockConfig)
        assert.ok(res.data instanceof FormData)
        assert.ok(!res.data.get('_type'))
        assert.strictEqual(res.data.get('a'), 'hello')
        assert.strictEqual(res.headers['Content-Type'], 'multipart/form-data')
    })

    it('json to string', () => {
        const mockConfig = getOptions({
            headers: {},
            data: {
                _type: 'string',
                a: 'hello',
            },
        })
        const res = onRequest(mockConfig)
        assert.strictEqual(res.data, qs.stringify({ a: 'hello' }))
        assert.strictEqual(res.headers['Content-Type'], 'application/x-www-form-urlencoded')
    })
})
