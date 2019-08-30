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

    it('响应外部value改变', () => {
        const wrapper = mount(TmRange, {
            propsData: {
                value: 50,
            },
        })
        wrapper.setData({
            widthProgress: 100,
        })
        wrapper.setProps({
            value: 60,
        })
        const wrapperProgress = wrapper.find('.tm-range-progress')
        assert.strictEqual(wrapperProgress.element.style.width, '60px')
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
        wrapperFinger.trigger('touchend')
        assert.strictEqual(wrapperProgress.element.style.width, '20px')
        const emitChange = wrapper.emitted('change')
        assert.strictEqual(emitChange.length, 1)
        assert.strictEqual(emitChange[0][0], 20)
    })

    it('value超过最大值,显示比例100%', () => {
        const wrapper = mount(TmRange, {
            propsData: {
                value: 200,
            },
        })
        wrapper.setData({
            widthProgress: 100,
        })
        const wrapperProgress = wrapper.find('.tm-range-progress')
        assert.strictEqual(wrapperProgress.element.style.width, '100px')
    })

    it('在手指离开之前不会重新判断滑动方向', () => {
        const wrapper = mount(TmRange, {
            propsData: {
                value: 0,
            },
        })
        wrapper.setData({
            widthProgress: 100,
        })
        const vm = wrapper.vm
        const wrapperFinger = wrapper.find('.tm-range-finger')
        const wrapperProgress = wrapper.find('.tm-range-progress')

        wrapperFinger.trigger('touchstart', {
            changedTouches: [{ pageX: 0, pageY: 0 }],
        })
        wrapperFinger.trigger('touchmove', {
            changedTouches: [{ pageX: 3, pageY: 3 }],
        })
        assert.strictEqual(vm.direction, '')

        wrapperFinger.trigger('touchmove', {
            changedTouches: [{ pageX: 1, pageY: 10 }],
        })
        assert.strictEqual(vm.direction, 'vertical')

        wrapperFinger.trigger('touchmove', {
            changedTouches: [{ pageX: 10, pageY: 1 }],
        })
        assert.strictEqual(vm.direction, 'vertical')

        wrapperFinger.trigger('touchend', {
            changedTouches: [{ pageX: 200 }],
        })
        assert.strictEqual(vm.direction, '')

        assert.ok(!wrapper.emitted('change'))
        assert.strictEqual(wrapperProgress.element.style.width, '0px')
    })

    it('touchmove超过最大限度', () => {
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
            changedTouches: [{ pageX: 20 }],
        })

        wrapperFinger.trigger('touchmove', {
            changedTouches: [{ pageX: 200 }],
        })
        assert.strictEqual(wrapperProgress.element.style.width, '100px')

        wrapperFinger.trigger('touchmove', {
            changedTouches: [{ pageX: -200 }],
        })
        assert.strictEqual(wrapperProgress.element.style.width, '0px')
    })

    it('disabled', () => {
        const wrapper = mount(TmRange, {
            propsData: {
                disabled: true,
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
        wrapperFinger.trigger('touchend')

        assert.strictEqual(wrapperProgress.element.style.width, '0px')
        assert.ok(!wrapper.emitted('change'))
    })
})
