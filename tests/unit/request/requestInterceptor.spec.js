import assert from 'assert'
import requestInterceptor from 'web/@util/request/src/requestInterceptor'
import qs from 'qs'

describe('request > requestInterceptor', () => {
    it('不处理空数据体', () => {
        const mockConfig = {
            data: null,
        }
        const res = requestInterceptor(mockConfig)
        assert.strictEqual(res, mockConfig)
    })

    it('string 不处理', () => {
        const mockConfig = {
            headers: {},
            data: 'hello',
        }
        const res = requestInterceptor(mockConfig)
        assert.strictEqual(res.data, 'hello')
        assert.strictEqual(res.headers['Content-Type'], 'application/x-www-form-urlencoded')
    })

    it('FormData 不处理', () => {
        const mockData = new FormData()
        const mockConfig = {
            headers: {},
            data: mockData,
        }
        const res = requestInterceptor(mockConfig)
        assert.strictEqual(res.data, mockData)
        assert.strictEqual(res.headers['Content-Type'], 'multipart/form-data')
    })

    it('json to json', () => {
        const mockData = {
            _type: 'json',
            a: 'hello',
        }
        const mockConfig = {
            headers: {},
            data: mockData,
        }
        const res = requestInterceptor(mockConfig)
        assert.deepStrictEqual(res.data, { a: 'hello' })
        assert.strictEqual(res.headers['Content-Type'], 'application/json')
    })

    it('json to form', () => {
        const mockData = {
            _type: 'form',
            a: 'hello',
        }
        const mockConfig = {
            headers: {},
            data: mockData,
        }
        const res = requestInterceptor(mockConfig)
        assert.ok(res.data instanceof FormData)
        assert.ok(!res.data.get('_type'))
        assert.strictEqual(res.data.get('a'), 'hello')
        assert.strictEqual(res.headers['Content-Type'], 'multipart/form-data')
    })

    it('json to string', () => {
        const mockData = {
            _type: 'string',
            a: 'hello',
        }
        const mockConfig = {
            headers: {},
            data: mockData,
        }
        const res = requestInterceptor(mockConfig)
        assert.strictEqual(res.data, qs.stringify({ a: 'hello' }))
        assert.strictEqual(res.headers['Content-Type'], 'application/x-www-form-urlencoded')
    })
})
