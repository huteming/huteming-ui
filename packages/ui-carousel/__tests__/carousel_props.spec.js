import { mount, shallowMount, createWrapper, createLocalVue } from '@vue/test-utils'
import TmCarousel from '../src/carousel'
import TmCarouselItem from '../src/carousel-item'
import assert from 'assert'
import { sleep } from 'tests/helper'
import sinon from 'sinon'

const localVue = createLocalVue()
localVue.component('TmCarousel', TmCarousel)
localVue.component('TmCarouselItem', TmCarouselItem)

async function create (params, methods = {}) {
    const wrap = mount({
        template: `
            <tm-carousel :initial="initial" :interval="interval" :autoplay="autoplay" :disabled-touch="disabledTouch">
                <tm-carousel-item v-for="item in count" :key="'async' + item">{{ item }}</tm-carousel-item>
            </tm-carousel>
        `,
        data () {
            const a = Object.assign({
                count: 3,
                initial: 0,
                interval: 3000,
                autoplay: false,
                disabledTouch: false,
            }, params)
            return a
        },
    }, {
        localVue,
        methods,
    })
    const parent = wrap.find(TmCarousel)
    const children = wrap.findAll(TmCarouselItem)
    sinon.replaceGetter(parent.vm.$el, 'offsetWidth', () => {
        return 375
    })
    await sleep(10)
    return [wrap, parent, children]
}

describe('carousel', () => {
    it('create', async () => {
        const [wrap, parent, children] = await create({ count: 3 })

        assert.strictEqual(parent.vm.currentIndex, 0)
        assert.strictEqual(children.at(0).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
        assert.strictEqual(children.at(1).attributes('style'), 'transform: translateX(375px); webkit-transform: translateX(375px);')
        assert.strictEqual(children.at(2).attributes('style'), 'transform: translateX(-375px); webkit-transform: translateX(-375px);')
    })

    it('自定义初始化活跃项', async () => {
        const [wrap, parent, children] = await create({ count: 3, initial: 1 })
        assert.strictEqual(children.at(0).attributes('style'), 'transform: translateX(-375px); webkit-transform: translateX(-375px);')
        assert.strictEqual(children.at(1).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
        assert.strictEqual(children.at(2).attributes('style'), 'transform: translateX(375px); webkit-transform: translateX(375px);')
    })

    it('异步初始化活跃项', async () => {
        const [wrap, parent, children] = await create({ initial: 0 })
        wrap.setData({ initial: 1 })
        await sleep()
        assert.strictEqual(children.at(1).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
    })

    it('异步初始化轮播项', async () => {
        let wrap
        let children
        [wrap, , children] = await create({ count: 0 })

        assert.strictEqual(children.length, 0)

        wrap.setData({ count: 3 })
        await sleep()
        children = wrap.findAll(TmCarouselItem)

        assert.strictEqual(children.length, 3)
        assert.strictEqual(children.at(0).attributes('style'), 'transform: translateX(0px); webkit-transform: translateX(0px);')
        assert.strictEqual(children.at(1).attributes('style'), 'transform: translateX(375px); webkit-transform: translateX(375px);')
        assert.strictEqual(children.at(2).attributes('style'), 'transform: translateX(-375px); webkit-transform: translateX(-375px);')
    })

    it('自动播放', async () => {
        const [, parent] = await create({ autoplay: true, interval: 15 })
        await sleep(10)

        assert.strictEqual(parent.vm.currentIndex, 1)
    })

    it('异步自动播放', async () => {
        const [wrap, parent] = await create({ autoplay: false, interval: 40 })
        assert.strictEqual(parent.vm.currentIndex, 0)

        wrap.setData({ autoplay: true })
        await sleep(50)

        assert.strictEqual(parent.vm.currentIndex, 1)

        wrap.setData({ autoplay: false })
        await sleep(50)

        assert.strictEqual(parent.vm.currentIndex, 1)
    })

    it('禁用手势滑动', async () => {
        const [wrap, parent] = await create({ disabledTouch: true })
        const { handleTouchstart, handleTouchmove, handleTouchend } = parent.vm

        assert.strictEqual(handleTouchstart(), false)
        assert.strictEqual(handleTouchmove(), false)
        assert.strictEqual(handleTouchend(), false)
    })

    afterEach(() => {
        sinon.restore()
    })
})
