import CompAnchor from '../components/anchor'
import { mount } from '@vue/test-utils'
import assert from 'assert'

describe('anchor', () => {
    it('按钮在滚动区域内', () => {
        const wrapper = mount(CompAnchor)
        const wrapperBtn = wrapper.find('#btn2')
        const wrapperContainer = wrapper.find('#container')
        const wrapperTarget = wrapper.find('#target')
        const originScroll = wrapperContainer.element.scrollTop
        wrapperBtn.trigger('click')
        const expectScroll = wrapperTarget.element.getBoundingClientRect().top
        const actualScroll = wrapperContainer.element.scrollTop
        console.log(wrapper.vm.$refs.container.scrollTop)
        wrapper.vm.$refs.container.scrollTop = 20
        console.log(wrapper.vm.$refs.container.scrollTop)

        assert.strictEqual(originScroll, 0)
        assert.ok(expectScroll > 0)
        assert.strictEqual(actualScroll, expectScroll)
    })
})
