import assert from 'assert'
import InfiniteScroll, { __RewireAPI__ as RewireAPI } from 'web-ui/infinite-scroll/src/infinite-scroll'
import { mount, createWrapper } from '@vue/test-utils'
import { sleep, Mock } from '../helper'
import sinon from 'sinon'
const scope = '@@InfiniteScroll'

describe('infinite-scroll', () => {
    let wrapper
    let tryTimes = 1

    beforeAll(() => {
        RewireAPI.__Rewire__('attached', (el, fn) => {
            setTimeout(fn, 20)

            if (tryTimes > 1) {
                setTimeout(fn, 50)
                tryTimes = 1
            }
        })
    })

    afterAll(() => {
        RewireAPI.__ResetDependency__('attached')
    })

    afterEach(() => {
        sinon.restore()
        wrapper && wrapper.destroy()
    })

    it('create', async () => {
        wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" v-infinite-scroll="load" style="height: 300px;overflow: auto;">
                    <li v-for="i in count" style="display: flex;height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 0,
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
        assert.strictEqual(wrapperContainer.isEmpty(), true)

        const events = new Event('scroll')
        wrapperContainer.element[scope].scrollEventTarget.dispatchEvent(events)
        assert.strictEqual(wrapperContainer.isEmpty(), false)
    })

    it('disabled', async () => {
        wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" v-infinite-scroll="{ callback: load, disabled: true }" style="height: 300px;overflow: auto;">
                    <li v-for="i in count" style="display: flex;height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 0,
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
        assert.strictEqual(wrapperContainer.isEmpty(), true)

        const events = new Event('scroll')
        wrapperContainer.element[scope].scrollEventTarget.dispatchEvent(events)
        assert.strictEqual(wrapperContainer.isEmpty(), true)
    })

    it('update disabled', async () => {
        wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" v-infinite-scroll="{ callback: load, disabled }" style="height: 300px;overflow: auto;">
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

        const wrapperContainer = wrapper.find('#container')
        assert.strictEqual(wrapperContainer.isEmpty(), true)
        wrapper.setData({ disabled: false })

        const events = new Event('scroll')
        wrapperContainer.element[scope].scrollEventTarget.dispatchEvent(events)
        assert.strictEqual(wrapperContainer.isEmpty(), false)
    })

    it('immediate', async () => {
        const onCheck = sinon.fake()
        RewireAPI.__Rewire__('checkReachBottom', onCheck)

        wrapper = mount({
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
        const self = wrapper.vm.$refs.scrollTarget[scope]
        assert.ok(onCheck.getCall(0).calledOn(self))

        RewireAPI.__ResetDependency__('checkReachBottom')
    })

    it('监听infinite-scroll事件', async () => {
        const onCheck = sinon.fake()
        RewireAPI.__Rewire__('checkReachBottom', onCheck)

        wrapper = mount({
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
        const self = wrapper.vm.$refs.scrollTarget[scope]
        assert.ok(onCheck.getCall(0).calledOn(self))

        RewireAPI.__ResetDependency__('checkReachBottom')
    })

    it('update invalid options', async () => {
        wrapper = mount({
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

        wrapper.setData({ options: false })
        assert.strictEqual(wrapper.vm.$refs.scrollTarget[scope].options.disabled, true)
    })

    it('无效的移除监听', async () => {
        const onRemove = sinon.fake()
        sinon.replace(Element.prototype, 'removeEventListener', onRemove)

        wrapper = mount({
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

        wrapper = mount({
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
        wrapper = mount({
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
        await sleep()

        const eleContainer = wrapper.vm.$refs.scrollTarget
        // mock 上一次滚动条位置
        eleContainer[scope].beforeScrollTop = 1000
        eleContainer[scope].scrollEventTarget.dispatchEvent(new Event('scroll'))
        assert.strictEqual(wrapper.vm.count, 10)
    })

    it('scroll in window', async () => {
        wrapper = mount({
            template: `
                <ul ref="scrollTarget" id="container" v-infinite-scroll>
                    <li v-for="i in count" style="display: flex;height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 0,
                    done: null,
                }
            },
            methods: {
                load (done) {
                    this.done = done
                    this.count += 2
                },
                restore () {
                    this.done()
                },
            },
            directives: {
                InfiniteScroll,
            },
        }, { attachToDocument: true })
        await sleep()

        const eleContainer = wrapper.vm.$refs.scrollTarget
        window.dispatchEvent(new Event('scroll'))
        assert.strictEqual(eleContainer[scope].scrollEventTarget, window)
    })

    it('done函数', async () => {
        wrapper = mount({
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
        await sleep()

        const eleContainer = wrapper.vm.$refs.scrollTarget
        const scrollEvent = new Event('scroll')
        eleContainer[scope].scrollEventTarget.scrollTop = 1000
        eleContainer[scope].scrollEventTarget.dispatchEvent(scrollEvent)
        assert.strictEqual(wrapper.vm.count, 12)

        // 这个延迟是因为滚动事件有 200ms 节流
        await sleep(220)
        // done运行之前再次滚动
        eleContainer[scope].scrollEventTarget.dispatchEvent(scrollEvent)
        assert.strictEqual(wrapper.vm.count, 12)

        await sleep(220)
        wrapper.vm.restore()
        eleContainer[scope].scrollEventTarget.dispatchEvent(scrollEvent)
        assert.strictEqual(wrapper.vm.count, 14)
    })

    it('throttle', async () => {
        const onCheck = sinon.fake()
        RewireAPI.__Rewire__('checkReachBottom', onCheck)

        wrapper = mount({
            template: `
                <ul id="container" ref="scrollTarget" style="height: 300px; overflow: auto;" v-infinite-scroll="{ callback: load }">
                    <li v-for="i in count" style="display: block; height: 50px;">{{ i }}</li>
                </ul>
            `,
            data () {
                return {
                    count: 10,
                }
            },
            methods: {
                load (done) {
                    done()
                    this.count += 2
                },
            },
            directives: {
                InfiniteScroll,
            },
        })
        await sleep()

        const eleContainer = wrapper.vm.$refs.scrollTarget
        const scrollEvent = new Event('scroll')
        // 立即执行
        eleContainer[scope].scrollEventTarget.dispatchEvent(scrollEvent)
        assert.strictEqual(onCheck.callCount, 1)

        // 距离上次执行 200ms 之后执行
        await sleep()
        eleContainer[scope].scrollEventTarget.dispatchEvent(scrollEvent)
        assert.strictEqual(onCheck.callCount, 1)

        // 清除上一次事件，距离上次执行 200ms 之后执行
        await sleep()
        eleContainer[scope].scrollEventTarget.dispatchEvent(scrollEvent)
        assert.strictEqual(onCheck.callCount, 1)

        await sleep(220)
        assert.strictEqual(onCheck.callCount, 2)

        RewireAPI.__ResetDependency__('checkReachBottom')
    })
})
