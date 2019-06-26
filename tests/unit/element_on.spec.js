import { on } from 'web-util/element/src/main'
import assert from 'assert'
import sinon from 'sinon'

describe('element > on', () => {
    afterEach(() => {
        sinon.restore()
    })

    it('建立监听', () => {
        const mockListener = sinon.fake()
        const element = {
            addEventListener: mockListener,
        }
        const event = 'event'
        const handler = 'handler'
        on(element, event, handler)
        const [_event, _handler, _capture] = mockListener.getCall(0).args
        assert.strictEqual(_event, event)
        assert.strictEqual(_handler, handler)
        assert.strictEqual(_capture, false)
    })

    it('element 为空', () => {
        const mockListener = sinon.fake()
        on(false, true, true)
        assert.strictEqual(mockListener.called, false)
    })

    it('event 为空', () => {
        const mockListener = sinon.fake()
        on(true, false, true)
        assert.strictEqual(mockListener.called, false)
    })

    it('handler 为空', () => {
        const mockListener = sinon.fake()
        on(true, true, false)
        assert.strictEqual(mockListener.called, false)
    })
})
