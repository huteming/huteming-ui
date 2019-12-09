import assert from 'assert'
import sinon from 'sinon'
import * as tools from '../src/utils/tools'

describe('tools', () => {
    describe('log', () => {
        it('测试环境不会打印', () => {
            sinon.replace(process.env, 'NODE_ENV', 'test')
            const mockLog = sinon.fake()
            sinon.replace(console, 'log', mockLog)
            tools.log('hello')
            assert.ok(mockLog.notCalled)
        })
        it('添加打印前缀', () => {
            sinon.replace(process.env, 'NODE_ENV', 'aaa')
            const mockLog = sinon.fake()
            sinon.replace(console, 'log', mockLog)
            tools.log('hello')
            assert.ok(mockLog.called)
            assert.deepStrictEqual(mockLog.getCall(0).args, ['@huteming Logger [Log]:', 'hello'])
        })
    })

    afterEach(() => {
        sinon.restore()
    })
})
