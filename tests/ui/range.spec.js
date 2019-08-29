import assert from 'assert'
import TmRange from 'web-ui/range/src/range'
import { mount } from '@vue/test-utils'

describe('range', () => {
    it('create', () => {
        const wrapper = mount(TmRange, {
            propsData: {
                value: 50,
            },
        })
        wrapper.setData({
            widthProgress: 100,
        })
        const wrapperProgress = wrapper.find('.tm-range-progress')
        assert.strictEqual(wrapperProgress.element.style.width, '50px')
    })

    it('touchmove', () => {
        const wrapper = mount(TmRange, {
            propsData: {
                value: 0,
            },
        })
        wrapper.setData({
            widthProgress: 100,
        })
        const wrapperFinger = wrapper.find('.tm-range-finger')
        const wrapperProgress = wrapper.find('.tm-range-progress')

        wrapperFinger.trigger('touchstart', {
            changedTouches: [{ pageX: 0 }],
        })
        wrapperFinger.trigger('touchmove', {
            changedTouches: [{ pageX: 20 }],
        })
        assert.strictEqual(wrapperProgress.element.style.width, '20px')

        wrapperFinger.trigger('touchmove', {
            changedTouches: [{ pageX: 200 }],
        })
        assert.strictEqual(wrapperProgress.element.style.width, '100px')
    })
})
