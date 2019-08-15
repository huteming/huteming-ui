import { mount, shallowMount, createWrapper, createLocalVue } from '@vue/test-utils'
import TmCarousel from 'web-ui/carousel/src/carousel'
import TmCarouselItem from 'web-ui/carousel/src/carousel-item'
import assert from 'assert'
import { sleep } from '../helper'
import sinon from 'sinon'

const localVue = createLocalVue()
localVue.component('TmCarousel', TmCarousel)
localVue.component('TmCarouselItem', TmCarouselItem)

describe('carousel', () => {
    afterEach(() => {
        sinon.restore()
    })

    it('create', async () => {
        const wrapper = shallowMount(TmCarousel, {
            slots: {
                default: ['<tm-carousel-item>1</tm-carousel-item>', '<tm-carousel-item>2</tm-carousel-item>', '<tm-carousel-item>3</tm-carousel-item>'],
            },
            localVue,
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        await sleep()
        const wrapperItem = wrapper.findAll('.tm-carousel-item')
        const wrapperItemActive = wrapperItem.at(0)
        assert.strictEqual(wrapperItemActive.attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
    })

    it('async initial', async () => {
        const wrapper = shallowMount(TmCarousel, {
            propsData: {
                initial: 0,
            },
            slots: {
                default: ['<tm-carousel-item>4</tm-carousel-item>', '<tm-carousel-item>5</tm-carousel-item>', '<tm-carousel-item>6</tm-carousel-item>'],
            },
            localVue,
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        wrapper.setProps({ initial: 1 })
        await sleep()
        const wrapperItem = wrapper.findAll('.tm-carousel-item')
        const wrapperItemActive = wrapperItem.at(1)
        assert.strictEqual(wrapperItemActive.attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
    })

    it('async initial && async items', async () => {
        const wrapper = mount({
            template: `
                <tm-carousel :initial="initial">
                    <tm-carousel-item v-for="item in count" :key="'async' + item">{{ item }}</tm-carousel-item>
                </tm-carousel>
            `,
            data () {
                return {
                    initial: 0,
                    count: 0,
                }
            },
        }, {
            localVue,
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        wrapper.setData({ initial: 1 })
        wrapper.setData({ count: 3 })
        await sleep()
        const wrapperItem = wrapper.findAll(TmCarouselItem)
        const wrapperItemActive = wrapperItem.at(1)
        assert.strictEqual(wrapperItemActive.attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
    })

    it('autoplay', async () => {
        const wrapper = mount({
            template: `
                <tm-carousel :autoplay="autoplay" :interval="300">
                    <tm-carousel-item v-for="item in 3" :key="'async' + item">{{ item }}</tm-carousel-item>
                </tm-carousel>
            `,
            data () {
                return {
                    autoplay: false
                }
            },
        }, {
            localVue,
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        await sleep()

        const wrapperItem = wrapper.findAll(TmCarouselItem)
        const wrapperItem0 = wrapperItem.at(0)
        const wrapperItem1 = wrapperItem.at(1)

        assert.strictEqual(wrapperItem0.attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        wrapper.setData({ autoplay: true })
        await sleep(310)
        assert.strictEqual(wrapperItem1.attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        wrapper.setData({ autoplay: false })
        await sleep(310)
        assert.strictEqual(wrapperItem1.attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
    })

    it('destroy', async () => {
        const wrapper = mount({
            template: `
                <tm-carousel autoplay>
                    <tm-carousel-item v-for="item in 1" :key="'async' + item">{{ item }}</tm-carousel-item>
                </tm-carousel>
            `,
            data () {
                return {
                }
            },
        }, {
            localVue,
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        sinon.spy(window, 'clearInterval')
        await sleep()
        const wrapperContainer = wrapper.find(TmCarousel)
        const wrapperItem = wrapper.findAll(TmCarouselItem)

        assert.strictEqual(wrapperContainer.vm.items.length, 1)

        wrapperItem.destroy()
        assert.strictEqual(wrapperContainer.vm.items.length, 0)

        const timer = wrapperContainer.vm.timer
        wrapperContainer.destroy()
        assert.ok(clearInterval.calledWithExactly(timer))
        assert.strictEqual(wrapperContainer.vm.timer, null)
    })

    it('setActiveItem', async () => {
        let valid
        const mockLog = sinon.fake()
        const wrapper = mount({
            template: `
                <tm-carousel ref="carousel" :loop="loop">
                    <tm-carousel-item name="item0" v-if="hasChild">item0</tm-carousel-item>
                    <tm-carousel-item name="item1" v-if="hasChild">item1</tm-carousel-item>
                    <tm-carousel-item name="item1" v-if="hasChild">1</tm-carousel-item>
                    <tm-carousel-item name="item2" v-if="hasChild">2</tm-carousel-item>
                    <tm-carousel-item name="item3" v-if="hasChild">3</tm-carousel-item>
                    <tm-carousel-item name="item4" v-if="hasChild">4</tm-carousel-item>
                </tm-carousel>
            `,
            data () {
                return {
                    count: 0,
                    loop: true,
                    hasChild: false,
                }
            },
        }, {
            localVue,
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        sinon.replace(console, 'warn', mockLog)
        await sleep()
        const eleCarousel = wrapper.vm.$refs.carousel

        // 没有子元素
        valid = eleCarousel.setActiveItem(10)
        assert.strictEqual(valid, false)

        wrapper.setData({ count: 3, hasChild: true })
        await sleep()
        const wrapperItem = wrapper.findAll(TmCarouselItem)

        // 参数为字符串，存在重复
        valid = eleCarousel.setActiveItem('item1')
        assert.strictEqual(valid, true)
        await sleep()
        assert.strictEqual(wrapperItem.at(1).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        // 参数为字符串，不重复
        valid = eleCarousel.setActiveItem('item2')
        assert.strictEqual(valid, true)
        await sleep()
        assert.strictEqual(wrapperItem.at(3).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        // 参数为字符串，不存在
        valid = eleCarousel.setActiveItem('invalid')
        assert.strictEqual(valid, false)
        assert.ok(mockLog.calledWithExactly('[@huteming/ui Warn][Carousel]index is invalid: ', 'invalid'))

        // 参数 小于0
        valid = eleCarousel.setActiveItem(-1)
        assert.strictEqual(valid, true)
        await sleep()
        assert.strictEqual(wrapperItem.at(5).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        // 参数 大于total
        valid = eleCarousel.setActiveItem(7)
        assert.strictEqual(valid, true)
        await sleep()
        assert.strictEqual(wrapperItem.at(1).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        // 参数 大于0 小于total
        valid = eleCarousel.setActiveItem(2)
        assert.strictEqual(valid, true)
        await sleep()
        assert.strictEqual(wrapperItem.at(2).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        wrapper.setData({ loop: false })

        // 参数 小于0
        valid = eleCarousel.setActiveItem(-1)
        assert.strictEqual(valid, true)
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        // // 参数 大于total
        valid = eleCarousel.setActiveItem(7)
        assert.strictEqual(valid, true)
        await sleep()
        assert.strictEqual(wrapperItem.at(5).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
    })

    it('setActiveItem', async () => {
        let valid
        const wrapper = mount({
            template: `
                <tm-carousel ref="carousel" :loop="loop">
                    <tm-carousel-item name="item1">1</tm-carousel-item>
                    <tm-carousel-item name="item2">2</tm-carousel-item>
                    <tm-carousel-item name="item3">3</tm-carousel-item>
                </tm-carousel>
            `,
            data () {
                return {
                    count: 0,
                    loop: true,
                }
            },
        }, {
            localVue,
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        await sleep()
        const eleCarousel = wrapper.vm.$refs.carousel
        const wrapperItem = wrapper.findAll(TmCarouselItem)

        // prev
        valid = eleCarousel.prev()
        assert.strictEqual(valid, true)
        await sleep()
        assert.strictEqual(wrapperItem.at(2).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        // next
        valid = eleCarousel.next()
        assert.strictEqual(valid, true)
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
    })

    it('playSlides', async () => {
        let valid
        const wrapper = mount({
            template: `
                <tm-carousel ref="carousel" :loop="loop">
                    <tm-carousel-item name="item1">1</tm-carousel-item>
                    <tm-carousel-item name="item2">2</tm-carousel-item>
                    <tm-carousel-item name="item3">3</tm-carousel-item>
                </tm-carousel>
            `,
            data () {
                return {
                    loop: false,
                }
            },
        }, {
            localVue,
        })
        sinon.replaceGetter(wrapper.element, 'offsetWidth', () => {
            return 750
        })
        sinon.spy(window, 'clearInterval')
        await sleep()
        const wrapperContainer = wrapper.find(TmCarousel)
        const eleCarousel = wrapper.vm.$refs.carousel
        const wrapperItem = wrapper.findAll(TmCarouselItem)

        valid = eleCarousel.playSlides()
        assert.strictEqual(valid, true)
        await sleep()
        assert.strictEqual(wrapperItem.at(1).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        const timer = wrapperContainer.vm.timer
        valid = eleCarousel.playSlides()
        assert.strictEqual(valid, true)
        assert.ok(clearInterval.calledWithExactly(timer))
        assert.strictEqual(wrapperContainer.vm.timer, null)
        await sleep()
        assert.strictEqual(wrapperItem.at(2).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        valid = eleCarousel.playSlides()
        assert.strictEqual(valid, false)
        await sleep()
        assert.strictEqual(wrapperItem.at(2).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        wrapper.setData({ loop: true })

        valid = eleCarousel.playSlides()
        assert.strictEqual(valid, true)
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
    })

    it('滑动到下一帧', async () => {
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
            changedTouches: [{ pageX: 300, pageY: 0 }],
        })
        assert.strictEqual(mockPause.callCount, 1)

        handleTouchmove({
            changedTouches: [{ pageX: 0, pageY: 1 }],
            cancelable: true,
            preventDefault: mockPrevent,
        })
        assert.strictEqual(mockPrevent.callCount, 1)
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(-300px); webkit-transform: translateX(-300px);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(1).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
    })

    it('event touch disabled', async () => {
        const mockPause = sinon.fake()
        const wrapper = mount(TmCarousel, {
            propsData: {
                disabledTouch: true,
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
        const { handleTouchstart, handleTouchmove, handleTouchend } = wrapper.vm

        assert.strictEqual(handleTouchstart(), false)
        assert.strictEqual(handleTouchmove(), false)
        assert.strictEqual(handleTouchend(), false)
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
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
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
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(-3px); webkit-transform: translateX(-3px);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
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
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateY(0px); webkit-transform: translateY(0px);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateY(0px); webkit-transform: translateY(0px);')
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
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
    })

    it('滑动到达右边界限', async () => {
        const mockPause = sinon.fake()
        const mockPrevent = sinon.fake()
        const wrapper = mount(TmCarousel, {
            propsData: {
                loop: false,
                initial: 2,
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
            changedTouches: [{ pageX: 300, pageY: 0 }],
        })

        handleTouchmove({
            changedTouches: [{ pageX: 0, pageY: 0 }],
            preventDefault: mockPrevent,
        })
        assert.strictEqual(mockPrevent.callCount, 0)
        assert.strictEqual(wrapperItem.at(2).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(2).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
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
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
    })

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
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(300px); webkit-transform: translateX(300px);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(2).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
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
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(30px); webkit-transform: translateX(30px);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(0).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
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
        assert.strictEqual(wrapperItem.at(2).attributes('style'), 'transform: translateX(-30px); webkit-transform: translateX(-30px);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(2).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
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
        assert.strictEqual(wrapperItem.at(1).attributes('style'), 'transform: translateX(-30px); webkit-transform: translateX(-30px);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(1).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
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
        assert.strictEqual(wrapperItem.at(1).attributes('style'), 'transform: translateX(30px); webkit-transform: translateX(30px);')

        handleTouchend()
        await sleep()
        assert.strictEqual(wrapperItem.at(1).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
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
        assert.strictEqual(wrapper.vm.timer, null)

        handleTouchmove({
            changedTouches: [{ pageX: 30, pageY: 1 }],
            preventDefault: mockPrevent,
        })

        handleTouchend()

        assert.ok(wrapper.vm.timer)
    })
})
