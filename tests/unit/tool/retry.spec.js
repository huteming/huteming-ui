import assert from 'assert'
import sinon from 'sinon'
import * as tool from 'web-util/tool/src/main'

describe('tool > retry', () => {
    it('第一次正常', async () => {
        const mockSuccess = 'hello'
        const mockFn = sinon.fake.resolves(mockSuccess)
        const mockContext = {}
        const mockArgs = ['a', 'b', 'c']
        const res = await tool.retry(mockFn, 1).apply(mockContext, mockArgs)

        assert.strictEqual(mockFn.callCount, 1)
        const call0 = mockFn.getCall(0)
        assert.ok(call0.calledWithExactly(...mockArgs))
        assert.ok(call0.calledOn(mockContext))
        assert.strictEqual(res, mockSuccess)
    })

    it('第二次正常', async () => {
        const mockSuccess = 'hello'
        let execFlag = false
        const mockFnSuccess = sinon.fake.resolves(mockSuccess)
        const mockFnError = sinon.fake.rejects(new Error('error'))
        const mockFn = function () {
            const res = execFlag ? mockFnSuccess.apply(this, arguments) : mockFnError.apply(this, arguments)
            execFlag = true
            return res
        }
        const mockContext = {}
        const mockArgs = ['a', 'b', 'c']
        const res = await tool.retry(mockFn, 2).apply(mockContext, mockArgs)

        assert.strictEqual(mockFnError.callCount, 1)
        assert.strictEqual(mockFnSuccess.callCount, 1)
        assert.deepStrictEqual(mockFnError.getCall(0).args, mockArgs)
        assert.ok(mockFnError.calledOn(mockContext))
        assert.ok(mockFnSuccess.calledWithExactly(...mockArgs))
        assert.ok(mockFnSuccess.calledOn(mockContext))
        assert.strictEqual(res, mockSuccess)
    })

    it('异常', async done => {
        const mockErr = new Error('not apple pie')
        const mockFn = sinon.fake.rejects(mockErr)
        const mockContext = {}
        const mockArgs = ['a', 'b', 'c']
        const handle = tool.retry(mockFn).bind(mockContext)
        try {
            await handle(...mockArgs)
            done(new Error('期望异常'))
        } catch (err) {
            assert.strictEqual(mockFn.callCount, 2)
            const call0 = mockFn.getCall(0)
            const call1 = mockFn.getCall(1)
            assert.ok(call0.calledWithExactly(...mockArgs))
            assert.ok(call0.calledOn(mockContext))
            assert.ok(call1.calledWithExactly(...mockArgs))
            assert.ok(call1.calledOn(mockContext))
            assert.strictEqual(err, mockErr)
            done()
        }
    })
})
