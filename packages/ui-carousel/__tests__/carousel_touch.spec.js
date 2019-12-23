import { mount, shallowMount, createWrapper, createLocalVue } from '@vue/test-utils'
import TmCarousel from '../src/carousel'
import TmCarouselItem from '../src/carousel-item'
import assert from 'assert'
import { sleep, cleanDom } from 'tests/helper'
import sinon from 'sinon'

let random = 10
const localVue = createLocalVue()
localVue.component('TmCarousel', TmCarousel)
localVue.component('TmCarouselItem', TmCarouselItem)

async function create (params, methods = {}) {
    const wrap = mount({
        template: `
            <tm-carousel :loop="loop" :direction="direction" :initial="initial" :interval="interval" :autoplay="autoplay" :disabled-touch="disabledTouch">
                <tm-carousel-item v-for="item in count" :key="random + 'async' + item">{{ item }}</tm-carousel-item>
            </tm-carousel>
        `,
        data () {
            const a = Object.assign({
                count: 3,
                initial: 0,
                interval: 3000,
                autoplay: false,
                disabledTouch: false,
                loop: false,
                direction: 'horizontal',
                random,
            }, params)
            random += a.count
            return a
        },
    }, {
        localVue,
    })
    const parent = wrap.find(TmCarousel)
    const children = wrap.findAll(TmCarouselItem)
    sinon.replaceGetter(parent.vm.$el, 'offsetWidth', () => {
        return 375
    })
    Object.entries(methods).forEach(([name, mock]) => parent.vm[name] = mock)
    await sleep(10)
    // fix: children多于3个，但是打印的html并不存在。咱不知道原因
    parent.vm.children.length = wrap.vm.count
    return [wrap, parent, children]
}

describe('carousel', () => {
    it('滑动到上一帧', async () => {
        const mockPause = sinon.fake()
        const mockPrevent = sinon.fake()
        const wrapper = mount(TmCarousel, {
            localVue,
            slots: {
                default: [
                    '<tm-carousel-item name="item1">1</tm-carousel-item>',
                    '<tm-carousel-item name="item2">2</tm-carousel-item>',
                    '<tm-carousel-item name="item3">3</tm-carousel-item>',
                ],
            },
            methods: {
                pauseTimer: mockPause,
            },
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        await sleep()
        const wrapperItem = wrapper.findAll(TmCarouselItem)
        const { handleTouchstart, handleTouchmove, handleTouchend } = wrapper.vm

        handleTouchstart({
            changedTouches: [{ pageX: 0, pageY: 0 }],
        })
        assert.strictEqual(mockPause.callCount, 1)

        handleTouchmove({
            changedTouches: [{ pageX: 300, pageY: 1 }],
            preventDefault: mockPrevent,
            cancelable: true,
        })
        assert.strictEqual(mockPrevent.callCount, 1)
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(300px) scale(1); webkit-transform: translateX(300px) scale(1);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(2).attributes('style'), 'transform: translateX(0px) scale(1); webkit-transform: translateX(0px) scale(1);')
    })

    it('滑动到下一帧', async () => {
        const mockPause = sinon.fake()
        const [wrap, parent] = await create({}, { pauseTimer: mockPause })
        const mockPrevent = sinon.fake()
        const { handleTouchstart, handleTouchmove, handleTouchend } = parent.vm

        assert.strictEqual(parent.vm.currentIndex, 0)

        handleTouchstart({
            changedTouches: [{ pageX: 300, pageY: 0 }],
        })
        handleTouchmove({
            changedTouches: [{ pageX: 0, pageY: 1 }],
            cancelable: true,
            preventDefault: mockPrevent,
        })
        handleTouchend()
        await sleep()

        assert.strictEqual(mockPause.callCount, 1)
        assert.strictEqual(mockPrevent.callCount, 1)
        assert.strictEqual(parent.vm.currentIndex, 1)
    })

    it('滑动到达右边界限', async () => {
        const [wrap, parent] = await create({ loop: false, initial: 2, direction: 'horizontal' })
        const mockPrevent = sinon.fake()
        const { handleTouchstart, handleTouchmove, handleTouchend } = parent.vm

        handleTouchstart({
            changedTouches: [{ pageX: 300, pageY: 0 }],
        })
        handleTouchmove({
            changedTouches: [{ pageX: 0, pageY: 0 }],
            preventDefault: mockPrevent,
        })
        handleTouchend()
        await sleep()

        assert.strictEqual(mockPrevent.callCount, 0)
        assert.strictEqual(parent.vm.currentIndex, 2)
    })

    it('滑动到达左边界限', async () => {
        const mockPause = sinon.fake()
        const mockPrevent = sinon.fake()
        const wrapper = mount(TmCarousel, {
            propsData: {
                loop: false,
                initial: 0,
                direction: 'horizontal',
            },
            localVue,
            slots: {
                default: [
                    '<tm-carousel-item name="item1">1</tm-carousel-item>',
                    '<tm-carousel-item name="item2">2</tm-carousel-item>',
                    '<tm-carousel-item name="item3">3</tm-carousel-item>',
                ],
            },
            methods: {
                pauseTimer: mockPause,
            },
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        await sleep()
        const wrapperItem = wrapper.findAll(TmCarouselItem)
        const { handleTouchstart, handleTouchmove, handleTouchend } = wrapper.vm

        handleTouchstart({
            changedTouches: [{ pageX: 0, pageY: 0 }],
        })

        handleTouchmove({
            changedTouches: [{ pageX: 300, pageY: 0 }],
            preventDefault: mockPrevent,
        })
        assert.strictEqual(mockPrevent.callCount, 0)
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px) scale(1); webkit-transform: translateX(0px) scale(1);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px) scale(1); webkit-transform: translateX(0px) scale(1);')
    })

    it('移动距离小于触发事件阈值', async () => {
        const mockPause = sinon.fake()
        const mockPrevent = sinon.fake()
        const wrapper = mount(TmCarousel, {
            localVue,
            slots: {
                default: [
                    '<tm-carousel-item name="item1">1</tm-carousel-item>',
                    '<tm-carousel-item name="item2">2</tm-carousel-item>',
                    '<tm-carousel-item name="item3">3</tm-carousel-item>',
                ],
            },
            methods: {
                pauseTimer: mockPause,
            },
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        await sleep()
        const wrapperItem = wrapper.findAll(TmCarouselItem)
        const { handleTouchstart, handleTouchmove, handleTouchend } = wrapper.vm

        handleTouchstart({
            changedTouches: [{ pageX: 3, pageY: 3 }],
        })

        handleTouchmove({
            changedTouches: [{ pageX: 0, pageY: 1 }],
            preventDefault: mockPrevent,
        })
        assert.strictEqual(mockPrevent.callCount, 0)
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px) scale(1); webkit-transform: translateX(0px) scale(1);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px) scale(1); webkit-transform: translateX(0px) scale(1);')
    })

    it('前一次滑动已经定义方向', async () => {
        const mockPause = sinon.fake()
        const mockPrevent = sinon.fake()
        const wrapper = mount(TmCarousel, {
            propsData: {
                direction: 'horizontal',
            },
            data () {
                return {
                    moveDirection: 'horizontal',
                }
            },
            localVue,
            slots: {
                default: [
                    '<tm-carousel-item name="item1">1</tm-carousel-item>',
                    '<tm-carousel-item name="item2">2</tm-carousel-item>',
                    '<tm-carousel-item name="item3">3</tm-carousel-item>',
                ],
            },
            methods: {
                pauseTimer: mockPause,
            },
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        await sleep()
        const wrapperItem = wrapper.findAll(TmCarouselItem)
        const { handleTouchstart, handleTouchmove, handleTouchend } = wrapper.vm

        handleTouchstart({
            changedTouches: [{ pageX: 3, pageY: 3 }],
        })

        handleTouchmove({
            changedTouches: [{ pageX: 0, pageY: 1 }],
            preventDefault: mockPrevent,
            cancelable: true,
        })
        assert.strictEqual(mockPrevent.callCount, 1)
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(-3px) scale(1); webkit-transform: translateX(-3px) scale(1);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px) scale(1); webkit-transform: translateX(0px) scale(1);')
    })

    it('左右滑动 && 定义垂直轮播', async () => {
        const mockPause = sinon.fake()
        const mockPrevent = sinon.fake()
        const wrapper = mount(TmCarousel, {
            propsData: {
                direction: 'vertical',
            },
            localVue,
            slots: {
                default: [
                    '<tm-carousel-item name="item1">1</tm-carousel-item>',
                    '<tm-carousel-item name="item2">2</tm-carousel-item>',
                    '<tm-carousel-item name="item3">3</tm-carousel-item>',
                ],
            },
            methods: {
                pauseTimer: mockPause,
            },
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        await sleep()
        const wrapperItem = wrapper.findAll(TmCarouselItem)
        const { handleTouchstart, handleTouchmove, handleTouchend } = wrapper.vm

        handleTouchstart({
            changedTouches: [{ pageX: 300, pageY: 0 }],
        })

        handleTouchmove({
            changedTouches: [{ pageX: 0, pageY: 0 }],
            preventDefault: mockPrevent,
        })
        assert.strictEqual(mockPrevent.callCount, 0)
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateY(0px) scale(1); webkit-transform: translateY(0px) scale(1);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateY(0px) scale(1); webkit-transform: translateY(0px) scale(1);')
    })

    it('上下滑动 && 定义水平轮播', async () => {
        const mockPause = sinon.fake()
        const mockPrevent = sinon.fake()
        const wrapper = mount(TmCarousel, {
            propsData: {
                direction: 'horizontal',
            },
            localVue,
            slots: {
                default: [
                    '<tm-carousel-item name="item1">1</tm-carousel-item>',
                    '<tm-carousel-item name="item2">2</tm-carousel-item>',
                    '<tm-carousel-item name="item3">3</tm-carousel-item>',
                ],
            },
            methods: {
                pauseTimer: mockPause,
            },
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        await sleep()
        const wrapperItem = wrapper.findAll(TmCarouselItem)
        const { handleTouchstart, handleTouchmove, handleTouchend } = wrapper.vm

        handleTouchstart({
            changedTouches: [{ pageX: 0, pageY: 300 }],
        })

        handleTouchmove({
            changedTouches: [{ pageX: 0, pageY: 0 }],
            preventDefault: mockPrevent,
        })
        assert.strictEqual(mockPrevent.callCount, 0)
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px) scale(1); webkit-transform: translateX(0px) scale(1);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px) scale(1); webkit-transform: translateX(0px) scale(1);')
    })

    it('loop && 滑动距离不足，还原到左边', async () => {
        const mockPause = sinon.fake()
        const mockPrevent = sinon.fake()
        const wrapper = mount(TmCarousel, {
            propsData: {
                initial: 0,
                loop: true,
            },
            localVue,
            slots: {
                default: [
                    '<tm-carousel-item name="item1">1</tm-carousel-item>',
                    '<tm-carousel-item name="item2">2</tm-carousel-item>',
                    '<tm-carousel-item name="item3">3</tm-carousel-item>',
                ],
            },
            methods: {
                pauseTimer: mockPause,
            },
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        await sleep()
        const wrapperItem = wrapper.findAll(TmCarouselItem)
        const { handleTouchstart, handleTouchmove, handleTouchend } = wrapper.vm

        handleTouchstart({
            changedTouches: [{ pageX: 0, pageY: 0 }],
        })
        assert.strictEqual(mockPause.callCount, 1)

        handleTouchmove({
            changedTouches: [{ pageX: 30, pageY: 1 }],
            preventDefault: mockPrevent,
            cancelable: true,
        })
        assert.strictEqual(mockPrevent.callCount, 1)
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(30px) scale(1); webkit-transform: translateX(30px) scale(1);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px) scale(1); webkit-transform: translateX(0px) scale(1);')
    })

    it('loop && 滑动距离不足，还原到右边', async () => {
        const mockPause = sinon.fake()
        const mockPrevent = sinon.fake()
        const wrapper = mount(TmCarousel, {
            propsData: {
                initial: 2,
                loop: true,
            },
            localVue,
            slots: {
                default: [
                    '<tm-carousel-item name="item1">1</tm-carousel-item>',
                    '<tm-carousel-item name="item2">2</tm-carousel-item>',
                    '<tm-carousel-item name="item3">3</tm-carousel-item>',
                ],
            },
            methods: {
                pauseTimer: mockPause,
            },
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        await sleep()
        // fix: children多余3个，但是打印的html并不存在。咱不知道原因
        wrapper.vm.children.length = 3
        const wrapperItem = wrapper.findAll(TmCarouselItem)
        const { handleTouchstart, handleTouchmove, handleTouchend } = wrapper.vm

        handleTouchstart({
            changedTouches: [{ pageX: 30, pageY: 0 }],
        })
        assert.strictEqual(mockPause.callCount, 1)

        handleTouchmove({
            changedTouches: [{ pageX: 0, pageY: 1 }],
            preventDefault: mockPrevent,
            cancelable: true,
        })
        assert.strictEqual(mockPrevent.callCount, 1)
        assert.strictEqual(wrapperItem.at(2).attributes('style'), 'transform: translateX(-30px) scale(1); webkit-transform: translateX(-30px) scale(1);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(2).attributes('style'), 'transform: translateX(0px) scale(1); webkit-transform: translateX(0px) scale(1);')
    })

    it('非循环 && 滑动距离不足，还原到右边', async () => {
        const mockPause = sinon.fake()
        const mockPrevent = sinon.fake()
        const wrapper = mount(TmCarousel, {
            propsData: {
                loop: false,
                initial: 1,
            },
            localVue,
            slots: {
                default: [
                    '<tm-carousel-item name="item1">1</tm-carousel-item>',
                    '<tm-carousel-item name="item2">2</tm-carousel-item>',
                    '<tm-carousel-item name="item3">3</tm-carousel-item>',
                ],
            },
            methods: {
                pauseTimer: mockPause,
            },
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        await sleep()
        const wrapperItem = wrapper.findAll(TmCarouselItem)
        const { handleTouchstart, handleTouchmove, handleTouchend } = wrapper.vm

        handleTouchstart({
            changedTouches: [{ pageX: 30, pageY: 0 }],
        })
        assert.strictEqual(mockPause.callCount, 1)

        handleTouchmove({
            changedTouches: [{ pageX: 0, pageY: 1 }],
            preventDefault: mockPrevent,
            cancelable: true,
        })
        assert.strictEqual(mockPrevent.callCount, 1)
        assert.strictEqual(wrapperItem.at(1).attributes('style'), 'transform: translateX(-30px) scale(1); webkit-transform: translateX(-30px) scale(1);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(1).attributes('style'), 'transform: translateX(0px) scale(1); webkit-transform: translateX(0px) scale(1);')
    })

    it('非循环 && 滑动距离不足，还原到左边', async () => {
        const mockPause = sinon.fake()
        const mockPrevent = sinon.fake()
        const wrapper = mount(TmCarousel, {
            propsData: {
                loop: false,
                initial: 1,
            },
            localVue,
            slots: {
                default: [
                    '<tm-carousel-item name="item1">1</tm-carousel-item>',
                    '<tm-carousel-item name="item2">2</tm-carousel-item>',
                    '<tm-carousel-item name="item3">3</tm-carousel-item>',
                ],
            },
            methods: {
                pauseTimer: mockPause,
            },
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        await sleep()
        const wrapperItem = wrapper.findAll(TmCarouselItem)
        const { handleTouchstart, handleTouchmove, handleTouchend } = wrapper.vm

        handleTouchstart({
            changedTouches: [{ pageX: 0, pageY: 0 }],
        })
        assert.strictEqual(mockPause.callCount, 1)

        handleTouchmove({
            changedTouches: [{ pageX: 30, pageY: 1 }],
            cancelable: true,
            preventDefault: mockPrevent,
        })
        assert.strictEqual(mockPrevent.callCount, 1)
        assert.strictEqual(wrapperItem.at(1).attributes('style'), 'transform: translateX(30px) scale(1); webkit-transform: translateX(30px) scale(1);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(1).attributes('style'), 'transform: translateX(0px) scale(1); webkit-transform: translateX(0px) scale(1);')
    })

    it('滑动期间暂停自动轮播', async () => {
        const mockPrevent = sinon.fake()
        const wrapper = mount(TmCarousel, {
            propsData: {
                autoplay: true,
            },
            localVue,
            slots: {
                default: [
                    '<tm-carousel-item name="item1">1</tm-carousel-item>',
                    '<tm-carousel-item name="item2">2</tm-carousel-item>',
                    '<tm-carousel-item name="item3">3</tm-carousel-item>',
                ],
            },
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        await sleep()
        const timer = wrapper.vm.timer
        const wrapperItem = wrapper.findAll(TmCarouselItem)
        const { handleTouchstart, handleTouchmove, handleTouchend } = wrapper.vm

        assert.ok(timer)

        handleTouchstart({
            changedTouches: [{ pageX: 0, pageY: 0 }],
        })
        assert.strictEqual(wrapper.vm.timer, 0)

        handleTouchmove({
            changedTouches: [{ pageX: 30, pageY: 1 }],
            preventDefault: mockPrevent,
        })

        handleTouchend()

        assert.ok(wrapper.vm.timer)
    })

    afterEach(() => {
        sinon.restore()
        cleanDom('tm-carousel-item')
    })
})
