import { mount } from '@vue/test-utils'
import WorkComponent from 'tests/components/element.vue'
import assert from 'assert'
import sinon from 'sinon'
import { getScrollContainer, __RewireAPI__ as RewireAPI } from '../src/main'
const scrollDom = {}

describe('element > getScrollContainer', () => {
    beforeAll(() => {
        RewireAPI.__Rewire__('isScroll', (el, vertical) => {
            return el === scrollDom && vertical
        })
    })

    afterAll(() => {
        RewireAPI.__ResetDependency__('isScroll')
    })

    it('element不存在', () => {
        const element = ''
        const res = getScrollContainer(element)
        assert.strictEqual(res, element)
    })

    it('限制顶层容器', () => {
        const element = {}
        const container = element
        const res = getScrollContainer(element, false, container)
        assert.strictEqual(res, element)
    })

    it('获取window元素', () => {
        void [window, document, document.documentElement].forEach(element => {
            const res = getScrollContainer(element, false)
            assert.strictEqual(res, window)
        })
    })

    it('获取可滚动区域', () => {
        const element = {
            parentNode: scrollDom,
        }
        const res = getScrollContainer(element, true)
        assert.strictEqual(res, scrollDom)
    })
})
