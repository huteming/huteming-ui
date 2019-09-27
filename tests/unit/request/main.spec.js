import moxios from 'moxios'
import Request, { __RewireAPI__ as RewireAPI } from 'web-util/request/src/main'
import assert from 'assert'
import sinon from 'sinon'

describe('request > main', () => {
    const mockSuccessRes = { flag: 1, msg: '', data: {} }
    let request

    beforeEach(() => {
        request = new Request()
        moxios.install(request.instance)
        moxios.stubRequest(/http:\/\/www.somesite.com\/success.*/, {
            status: 200,
            response: mockSuccessRes,
        })
    })

    it('post', async () => {
        const res = await request.post('http://www.somesite.com/success')
        assert.strictEqual(res.data, mockSuccessRes)
    })

    it('get', async () => {
        const res = await request.get('http://www.somesite.com/success')
        assert.strictEqual(res.data, mockSuccessRes)
    })

    it('jsonp success', async () => {
        const mockData = 'hhh'
        const mockJsonp = sinon.fake.yields(null, mockData)
        RewireAPI.__Rewire__('jsonp', mockJsonp)
        try {
            const res = await request.jsonp('a', { b: 'b' }, { c: 'c' })
            assert.strictEqual(mockJsonp.getCall(0).args[0], 'a?b=b')
            assert.deepStrictEqual(mockJsonp.getCall(0).args[1], { c: 'c' })
            assert.strictEqual(res, mockData)
        } finally {
            RewireAPI.__ResetDependency__('jsonp')
        }
    })

    it('jsonp error', async () => {
        const mockError = 'hhh'
        const mockJsonp = sinon.fake.yields(mockError)
        RewireAPI.__Rewire__('jsonp', mockJsonp)
        try {
            await request.jsonp('a')
        } catch(err) {
            assert.strictEqual(mockJsonp.getCall(0).args[0], 'a?')
            assert.strictEqual(err, mockError)
        } finally {
            RewireAPI.__ResetDependency__('jsonp')
        }
    })

    afterEach(() => {
        moxios.uninstall(request.instance)
    })
})
