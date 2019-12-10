import assert from 'assert'
import { __RewireAPI__ as RewireAPI } from '../src/infinite-scroll'
import InfiniteScroll from '../src/main'
import { mount, createWrapper, createLocalVue } from '@vue/test-utils'
import { sleep, Mock } from 'tests/helper'
import sinon from 'sinon'
const scope = '@@InfiniteScroll'

describe('infinite-scroll', () => {
    let wrapper
    let tryTimes = 1

    beforeAll(() => {
        RewireAPI.__Rewire__('attached', (el, fn) => {
            setTimeout(fn, 15)

            if (tryTimes > 1) {
                setTimeout(fn, 30)
                tryTimes = 1
            }
        })

        RewireAPI.__Rewire__('getScrollContainer', (el) => {
            return el
        })
    })

    afterAll(() => {
        RewireAPI.__ResetDependency__('attached')
        RewireAPI.__ResetDependency__('getScrollContainer')
    })

    afterEach(() => {
        sinon.restore()
        wrapper && wrapper.destroy()
    })

    it('install', () => {
        const localVue = createLocalVue()
        assert.ok(!localVue.directive('InfiniteScroll'))
        localVue.use(InfiniteScroll)
        assert.ok(localVue.directive('InfiniteScroll'))
    })

    it('create', async () => {
        const wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" v-infinite-scroll="load" style="height: 300px; overflow: auto;">
                    <li v-for="i in count" style="display: flex;height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 0,
                }
            },
            methods: {
                load (done) {
                    this.count += 2
                    done()
                },
            },
            directives: {
                InfiniteScroll,
            },
        }, {})
        const wrapperContainer = wrapper.find('#container')
        const domContainer = wrapperContainer.element
        await sleep()

        assert.strictEqual(wrapperContainer.isEmpty(), true)

        const events = new Event('scroll')
        domContainer.dispatchEvent(events)
        assert.strictEqual(wrapperContainer.isEmpty(), false)
    })

    it('disabled', async () => {
        const wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" v-infinite-scroll="{ callback: load, disabled: disabled }" style="height: 300px;overflow: auto;">
                    <li v-for="i in count" style="display: flex;height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 0,
                    disabled: true,
                }
            },
            methods: {
                load (done) {
                    this.count += 2
                    done()
                },
            },
            directives: {
                InfiniteScroll,
            },
        }, {})
        await sleep()

        const wrapperContainer = wrapper.find('#container')
        const domContainer = wrapperContainer.element

        const events = new Event('scroll')
        domContainer.dispatchEvent(events)
        assert.strictEqual(wrapper.vm.count, 0)
    })

    it('update disabled', async () => {
        const wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" v-infinite-scroll="{ callback: load, disabled: disabled }" style="height: 300px;overflow: auto;">
                    <li v-for="i in count" style="display: flex;height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 0,
                    disabled: true,
                }
            },
            methods: {
                load (done) {
                    this.count += 2
                    done()
                },
            },
            directives: {
                InfiniteScroll,
            },
        }, {})
        await sleep()

        const wrapperContainer = wrapper.find('#container')
        const domContainer = wrapperContainer.element

        wrapper.setData({ disabled: false })
        const events = new Event('scroll')
        domContainer.dispatchEvent(events)
        assert.strictEqual(wrapper.vm.count, 2)
    })

    it('immediate', async () => {
        const onCheck = sinon.fake()
        RewireAPI.__Rewire__('checkReachBottom', onCheck)

        const wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" v-infinite-scroll.immediate="load" style="height: 300px;overflow: auto;">
                    <li v-for="i in count" style="display: flex;height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 0,
                    disabled: true,
                }
            },
            methods: {
                load () {
                    this.count += 2
                },
            },
            directives: {
                InfiniteScroll,
            },
        }, {})
        await sleep()

        assert.strictEqual(onCheck.callCount, 1)

        RewireAPI.__ResetDependency__('checkReachBottom')
    })

    it('监听infinite-scroll事件', async () => {
        const onCheck = sinon.fake()
        RewireAPI.__Rewire__('checkReachBottom', onCheck)

        const wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" v-infinite-scroll="load" style="height: 300px;overflow: auto;">
                    <li v-for="i in count" style="display: flex;height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 0,
                    disabled: true,
                }
            },
            methods: {
                load () {
                    this.count += 2
                },
            },
            directives: {
                InfiniteScroll,
            },
        }, {})
        await sleep()

        assert.strictEqual(onCheck.callCount, 0)

        wrapper.vm.$emit('infinite-scroll')
        assert.strictEqual(onCheck.callCount, 1)

        RewireAPI.__ResetDependency__('checkReachBottom')
    })

    it('update invalid options', async () => {
        const wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" v-infinite-scroll="options" style="height: 300px;overflow: auto;">
                    <li v-for="i in count" style="display: flex;height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 0,
                    options: {
                        callback: this.load,
                        disabled: true,
                    },
                }
            },
            methods: {
                load () {
                    this.count += 2
                },
            },
            directives: {
                InfiniteScroll,
            },
        }, {})
        await sleep()

        const wrapperContainer = wrapper.find('#container')
        const domContainer = wrapperContainer.element
        wrapper.setData({ options: false })
        assert.strictEqual(domContainer[scope].options.disabled, true)
    })

    it('移除监听', async () => {
        const onRemove = sinon.fake()
        sinon.replace(Element.prototype, 'removeEventListener', onRemove)

        // 这里的 immediate 属性是为了测试覆盖 callback 不是 function 的情况
        const wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" v-infinite-scroll.immediate style="height: 300px;overflow: auto;">
                    <li v-for="i in count" style="display: flex;height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 0,
                    options: {
                        callback: this.load,
                        disabled: true,
                    },
                }
            },
            methods: {
                load () {
                    this.count += 2
                },
            },
            directives: {
                InfiniteScroll,
            },
        }, {})
        await sleep()

        wrapper.destroy()
        assert.strictEqual(onRemove.callCount, 1)
    })

    it('无效的移除监听', async () => {
        const onRemove = sinon.fake()
        sinon.replace(Element.prototype, 'removeEventListener', onRemove)

        const wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" v-infinite-scroll="options" style="height: 300px;overflow: auto;">
                    <li v-for="i in count" style="display: flex;height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 0,
                    options: {
                        callback: this.load,
                        disabled: true,
                    },
                }
            },
            methods: {
                load () {
                    this.count += 2
                },
            },
            directives: {
                InfiniteScroll,
            },
        }, {})
        await sleep()

        wrapper.vm.$refs.scrollTarget[scope] = null
        wrapper.destroy()
        assert.strictEqual(onRemove.callCount, 0)
    })

    it('bind once', async () => {
        tryTimes = 2
        const onCheck = sinon.fake()
        RewireAPI.__Rewire__('checkReachBottom', onCheck)

        const wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" style="height: 300px; overflow: auto;" v-infinite-scroll.immediate="load">
                    <li v-for="i in count" style="display: block; height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 2,
                    disabled: true,
                }
            },
            methods: {
                load () {
                    this.count += 2
                },
            },
            directives: {
                InfiniteScroll,
            },
        })
        await sleep()

        assert.strictEqual(onCheck.callCount, 1)

        RewireAPI.__ResetDependency__('checkReachBottom')
    })

    it('向上滑动', async () => {
        const wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" style="height: 300px; overflow: auto;" v-infinite-scroll="{ callback: load }">
                    <li v-for="i in count" style="display: block; height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 10,
                    disabled: false,
                }
            },
            methods: {
                load () {
                    this.count += 2
                },
            },
            directives: {
                InfiniteScroll,
            },
        })
        const domContainer = wrapper.vm.$refs.scrollTarget
        await sleep()

        // mock 上一次滚动条位置
        domContainer[scope].beforeScrollTop = 1000
        domContainer.dispatchEvent(new Event('scroll'))
        assert.strictEqual(wrapper.vm.count, 10)
    })

    it('scroll in window', async () => {
        const wrapper = mount({
            template: `
                <ul ref="scrollTarget" id="container" v-infinite-scroll="load">
                    <li v-for="i in count" style="display: flex;height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 0,
                }
            },
            methods: {
                load (done) {
                    this.count += 2
                    done()
                },
            },
            directives: {
                InfiniteScroll,
            },
        })
        const domContainer = wrapper.vm.$refs.scrollTarget
        // mock滚动容器是 window
        domContainer[scope].el = window
        window.scrollHeight = 0
        await sleep()
        // 还原指令绑定dom
        domContainer[scope].el = domContainer

        window.dispatchEvent(new Event('scroll'))
        assert.strictEqual(wrapper.vm.count, 2)
    })

    it('done函数', async () => {
        const wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" style="height: 300px; overflow: auto;" v-infinite-scroll="{ callback: load }">
                    <li v-for="i in count" style="display: block; height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 10,
                    restore: null,
                }
            },
            methods: {
                load (done) {
                    this.restore = done
                    this.count += 2
                },
            },
            directives: {
                InfiniteScroll,
            },
        })
        const domContainer = wrapper.vm.$refs.scrollTarget
        await sleep()

        const scrollEvent = new Event('scroll')
        domContainer.dispatchEvent(scrollEvent)
        assert.strictEqual(wrapper.vm.count, 12)

        // 这个延迟是因为滚动事件有 200ms 节流
        await sleep(220)
        // done运行之前再次滚动
        domContainer.dispatchEvent(scrollEvent)
        assert.strictEqual(wrapper.vm.count, 12)

        await sleep(220)
        wrapper.vm.restore()
        domContainer.dispatchEvent(scrollEvent)
        assert.strictEqual(wrapper.vm.count, 14)
    })

    it('throttle', async () => {
        const onCheck = sinon.fake()
        RewireAPI.__Rewire__('checkReachBottom', onCheck)

        const wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" style="height: 300px; overflow: auto;" v-infinite-scroll>
                    <li v-for="i in count" style="display: block; height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 10,
                }
            },
            methods: {
            },
            directives: {
                InfiniteScroll,
            },
        })
        const domContainer = wrapper.vm.$refs.scrollTarget
        await sleep()

        const scrollEvent = new Event('scroll')
        // 立即执行
        domContainer.dispatchEvent(scrollEvent)
        assert.strictEqual(onCheck.callCount, 1)

        // 距离上次执行 200ms 之前执行
        await sleep()
        domContainer.dispatchEvent(scrollEvent)
        assert.strictEqual(onCheck.callCount, 1)

        // 清除上一次事件，距离上次执行 200ms 之前执行
        await sleep()
        domContainer.dispatchEvent(scrollEvent)
        assert.strictEqual(onCheck.callCount, 1)

        await sleep(220)
        assert.strictEqual(onCheck.callCount, 2)

        RewireAPI.__ResetDependency__('checkReachBottom')
    })
})
