import { mount, shallowMount, createWrapper, createLocalVue } from '@vue/test-utils'
import TmCarousel from '../src/main'
import TmCarouselItem from '../../ui-carousel-item/src/main'
import assert from 'assert'
import { sleep } from 'tests/helper'
import sinon from 'sinon'

const localVue = createLocalVue()
localVue.use(TmCarousel)
localVue.use(TmCarouselItem)

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
    return [wrap, parent, children]
}

describe('carousel', () => {
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
        const beforeLength = wrapperContainer.vm.children.length

        wrapperItem.destroy()
        const afterLength = wrapperContainer.vm.children.length
        assert.strictEqual(beforeLength - afterLength, 1)

        const timer = wrapperContainer.vm.timer
        wrapperContainer.destroy()
        assert.ok(clearInterval.calledWithExactly(timer))
        assert.strictEqual(wrapperContainer.vm.timer, 0)
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
                    loop: true,
                }
            },
        }, {
            localVue,
        })
        let children
        const carousel = wrapper.find(TmCarousel)
        sinon.replaceGetter(carousel.vm.$el, 'offsetWidth', () => {
            return 375
        })
        await sleep()
        // fix: children多余3个，但是打印的html并不存在。咱不知道原因
        carousel.vm.children.length = 3

        // prev
        valid = carousel.vm.prev()
        assert.strictEqual(valid, true)
        await sleep()
        children = wrapper.findAll(TmCarouselItem)
        assert.strictEqual(children.at(2).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        // next
        valid = carousel.vm.next()
        assert.strictEqual(valid, true)
        await sleep()
        assert.strictEqual(children.at(0).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
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
        // fix: children多余3个，但是打印的html并不存在。咱不知道原因
        eleCarousel.children.length = 3

        valid = eleCarousel.playSlides()
        assert.strictEqual(valid, true)
        await sleep()
        assert.strictEqual(wrapperItem.at(1).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')

        const timer = wrapperContainer.vm.timer
        valid = eleCarousel.playSlides()
        assert.strictEqual(valid, true)
        assert.ok(clearInterval.calledWithExactly(timer))
        assert.strictEqual(wrapperContainer.vm.timer, 0)
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

    afterEach(() => {
        sinon.restore()
    })
})
