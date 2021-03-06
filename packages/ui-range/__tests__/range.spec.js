import assert from 'assert'
import TmRange from '../src/main'
import { mount, createLocalVue } from '@vue/test-utils'
import { sleep } from 'tests/helper'
import { Min, Max, Finger, Progress } from '../src/vars'
const localVue = createLocalVue()
localVue.use(TmRange)

describe('range', () => {
  it('change事件', async () => {
    const wrapper = mount(TmRange, {
      propsData: {
        value: 0,
      },
    })
    wrapper.setData({
      widthProgress: 100,
    })
    const wrapperFinger = wrapper.find(Finger)

    wrapperFinger.trigger('touchstart', {
        changedTouches: [{ pageX: 0 }],
    })
    wrapperFinger.trigger('touchmove', {
        changedTouches: [{ pageX: 20 }],
    })
    wrapperFinger.trigger('touchend')

    const emitChange = wrapper.emitted('change')
    assert.ok(emitChange)
    assert.deepStrictEqual(emitChange[0], [20])
  })

  it('moving事件', async () => {
    const wrapper = mount(TmRange, {
      propsData: {
        value: 0,
      },
    })
    wrapper.setData({
      widthProgress: 100,
    })
    const wrapperFinger = wrapper.find(Finger)
    let emitMoving

    wrapperFinger.trigger('touchstart', {
      changedTouches: [{ pageX: 0 }],
    })
    emitMoving = wrapper.emitted('moving')
    assert.strictEqual(emitMoving.length, 1)
    assert.deepStrictEqual(emitMoving[0], [0, true])

    wrapperFinger.trigger('touchmove', {
        changedTouches: [{ pageX: 20 }],
    })
    emitMoving = wrapper.emitted('moving')
    assert.strictEqual(emitMoving.length, 2)
    assert.deepStrictEqual(emitMoving[1], [20, true])

    wrapperFinger.trigger('touchend')
    emitMoving = wrapper.emitted('moving')
    assert.strictEqual(emitMoving.length, 3)
    assert.deepStrictEqual(emitMoving[2], [20, false])
  })

  it('create', async () => {
    const wrapper = mount(TmRange, {
      propsData: {
        value: 50,
      },
    })
    wrapper.setData({
      widthProgress: 100,
    })
    assert.strictEqual(wrapper.vm.styleProgress.width, '50px')
  })

    it('value超过最大值,显示比例100%', async () => {
        const wrapper = mount({
            template: `
                <tm-range v-model="value"></tm-range>
            `,
            data () {
                return {
                    value: 200,
                }
            },
        }, {
            localVue,
        })
        wrapper.find(TmRange).setData({
            widthProgress: 100,
        })
        await sleep()
        // console.log(wrapper.html())
        const wrapperProgress = wrapper.find(Progress)
        // assert.strictEqual(wrapperProgress.element.style.width, '100px')
    })

    it('响应外部value改变', async () => {
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
        await sleep()
        const wrapperProgress = wrapper.find(Progress)
        assert.strictEqual(wrapperProgress.element.style.width, '60px')
    })

    it('touchmove', async () => {
        const wrapper = mount(TmRange, {
            propsData: {
                value: 0,
            },
        })
        wrapper.setData({
            widthProgress: 100,
        })
        await sleep()
        const wrapperFinger = wrapper.find(Finger)
        const wrapperProgress = wrapper.find(Progress)

        wrapperFinger.trigger('touchstart', {
            changedTouches: [{ pageX: 0, pageY: 0 }],
        })
        wrapperFinger.trigger('touchmove', {
            changedTouches: [{ pageX: 20, pageY: 0 }],
        })
        wrapperFinger.trigger('touchend')
        // assert.strictEqual(wrapperProgress.element.style.width, '20px')
        const emitChange = wrapper.emitted('change')
        assert.strictEqual(emitChange.length, 1)
        assert.strictEqual(emitChange[0][0], 20)
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
        const wrapperFinger = wrapper.find(Finger)
        const wrapperProgress = wrapper.find(Progress)

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
                value: 10,
            },
        })
        wrapper.setData({
            widthProgress: 100,
        })
        const wrapperFinger = wrapper.find(Finger)
        const wrapperProgress = wrapper.find(Progress)

        wrapperFinger.trigger('touchstart', {
            changedTouches: [{ pageX: 20 }],
        })

        wrapperFinger.trigger('touchmove', {
            changedTouches: [{ pageX: 200 }],
        })
        // assert.strictEqual(wrapperProgress.element.style.width, '100px')

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
        const wrapperFinger = wrapper.find(Finger)
        const wrapperProgress = wrapper.find(Progress)

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

    it('前后渲染额外区域', () => {
        const wrap = mount(TmRange, {
          slots: {
            start: 'hello',
            end: 'world',
          }
        })
        const start = wrap.find('.tm-range__start')
        const end = wrap.find('.tm-range__end')
        assert.ok(start.exists())
        assert.ok(end.exists())
    })

  it('显示区间数字', () => {
    const wrap = mount(TmRange, {
        propsData: {
            showValue: true,
        },
    })
    const start = wrap.find(Min)
    const end = wrap.find(Max)
    assert.ok(start.exists())
    assert.ok(end.exists())
  })
})
