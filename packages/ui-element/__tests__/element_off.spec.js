import { off } from '../src/main'
import assert from 'assert'
import sinon from 'sinon'

describe('element > on', () => {
    afterEach(() => {
        sinon.restore()
    })

    it('移除监听', () => {
        const mockListener = sinon.fake()
        const element = {
            removeEventListener: mockListener,
        }
        const event = 'event'
        const handler = 'handler'
        off(element, event, handler)
        const [_event, _handler, _capture] = mockListener.getCall(0).args
        assert.strictEqual(_event, event)
        assert.strictEqual(_handler, handler)
        assert.strictEqual(_capture, false)
    })

    it('element 为空', () => {
        const mockListener = sinon.fake()
        off(false, true, true)
        assert.strictEqual(mockListener.called, false)
    })

    it('event 为空', () => {
        const mockListener = sinon.fake()
        off(true, false, true)
        assert.strictEqual(mockListener.called, false)
    })
})
