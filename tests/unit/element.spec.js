import { mount } from '@vue/test-utils'
import WorkComponent from '../components/element'
import assert from 'assert'
import { getScrollEventTarget } from 'web-util/element/src/main'

describe('element', () => {
    const wrapper = mount(WorkComponent)

    it('scrollX', () => {
        const btnScrollX = wrapper.find('#scrollX')
        btnScrollX.trigger('click')

        const eleContainer = wrapper.find('#container').element
        assert.strictEqual(eleContainer.scrollLeft, 20)
    })

    it('scrollY', () => {
        const btnScrollY = wrapper.find('#scrollY')
        btnScrollY.trigger('click')

        const eleContainer = wrapper.find('#container').element
        assert.strictEqual(eleContainer.scrollTop, 20)
    })

    it('scrollTo', () => {
        const btnScroll = wrapper.find('#scroll')
        btnScroll.trigger('click')

        const eleContainer = wrapper.find('#container').element
        assert.strictEqual(eleContainer.scrollLeft, 40)
        assert.strictEqual(eleContainer.scrollTop, 40)
    })

    describe('getScrollEventTarget', () => {
        it('获取滚动元素', () => {
            const eleContainer = wrapper.find('#container').element
            const eleOver = wrapper.vm.$refs.over

            const actual = getScrollEventTarget(eleOver)
            assert.strictEqual(actual, eleContainer)
        })

        it('获取window元素', () => {
            const eleEmpty = wrapper.vm.$refs.empty

            const actual = getScrollEventTarget(eleEmpty)
            assert.strictEqual(actual, window)
        })
    })
})
