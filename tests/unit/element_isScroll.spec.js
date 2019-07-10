import { isScroll, __RewireAPI__ as RewireAPI } from 'web-util/element/src/main'
import assert from 'assert'
import sinon from 'sinon'

describe('element > isScroll', () => {
    let mockGetStyle
    let count = -1

    beforeEach(() => {
        mockGetStyle = sinon.fake()
        RewireAPI.__Rewire__('getStyle', (...args) => {
            mockGetStyle(...args)
            count++
            const res = ['scroll', 'auto', 'none']
            return res[count]
        })
    })

    afterEach(() => {
        RewireAPI.__ResetDependency__('getStyle')
    })

    it('vertical', () => {
        const el = {
            scrollHeight: 100,
            clientHeight: 10,
        }
        const valid = isScroll(el, true)
        const [_el, styleName] = mockGetStyle.getCall(0).args
        assert.strictEqual(valid, true)
        assert.strictEqual(_el, el)
        assert.strictEqual(styleName, 'overflow-y')
    })

    it('horizontal', () => {
        const el = {
            scrollHeight: 100,
            clientHeight: 10,
        }
        const valid = isScroll(el, false)
        const [_el, styleName] = mockGetStyle.getCall(0).args
        assert.strictEqual(valid, true)
        assert.strictEqual(_el, el)
        assert.strictEqual(styleName, 'overflow-x')
    })

    it('vertical 或者 horizontal', () => {
        const el = {
            scrollHeight: 100,
            clientHeight: 10,
        }
        const valid = isScroll(el)
        const [_el, styleName] = mockGetStyle.getCall(0).args
        assert.strictEqual(valid, false)
        assert.strictEqual(_el, el)
        assert.strictEqual(styleName, 'overflow')
    })
})
