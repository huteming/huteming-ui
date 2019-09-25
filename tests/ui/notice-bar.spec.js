import TmNoticeBar, { __RewireAPI__ as RewireAPI } from 'web-ui/notice-bar/src/app.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import assert from 'assert'
import sinon from 'sinon'
import { sleep } from '../helper'
import TestBasic from '../components/basic.vue'
const localVue = createLocalVue()
localVue.component(TmNoticeBar.name, TmNoticeBar)
localVue.component(TestBasic.name, TestBasic)

describe('notice-bar', () => {
    it('create', async () => {
        let mockOffsetWidth = 200
        let mockIsFinish = false
        const mockLinear = sinon.fake()
        const mockTimeout = sinon.fake()
        RewireAPI.__Rewire__('linear', (...args) => {
            mockLinear(...args)
            mockIsFinish = !mockIsFinish
            args[2](100, mockIsFinish)
        })
        sinon.replaceGetter(HTMLDivElement.prototype, 'offsetWidth', () => {
            mockOffsetWidth += 1
            return mockOffsetWidth
        })
        sinon.replace(window, 'setTimeout', (...args) => {
            mockTimeout(...args)
            args[0]()
        })
        const wrapper = mount(TmNoticeBar, {
            slots: {
                default: '这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。',
            },
        })

        assert.strictEqual(wrapper.vm.icon, 'volume_up')
        const wrapperAction = wrapper.find('.tm-notice-bar-action')
        assert.ok(!wrapperAction.exists())

        assert.strictEqual(wrapper.vm.moveLeft, 100)
        // 滚动距离
        assert.strictEqual(mockLinear.getCall(0).args[1], 16)
        // 每次滚动耗时
        assert.strictEqual(mockLinear.getCall(0).args[3], 16 * 25)
        // 无限滚动
        assert.strictEqual(mockLinear.callCount, 2)
        // 开始滚动延时
        assert.strictEqual(mockTimeout.getCall(0).args[1], 2000)
        // 还原滚动延时
        assert.strictEqual(mockTimeout.getCall(1).args[1], 1000)

        RewireAPI.__ResetDependency__('linear')
    })

    it('不开启滚动', async () => {
        const mockMove = sinon.fake()
        const wrapper = mount(TmNoticeBar, {
            methods: {
                move: mockMove,
            },
            localVue,
        })
        assert.strictEqual(mockMove.callCount, 0)
    })

    it('mode closeable', async () => {
        const mockClear = sinon.fake()
        sinon.replace(window, 'clearTimeout', mockClear)
        const wrapper = mount({
            template: `
                <div>
                    <tm-notice-bar mode="closeable">
                        这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。
                    </tm-notice-bar>
                </div>
            `
        }, {
            localVue,
        })
        const wrapperBar = wrapper.find(TmNoticeBar)

        assert.strictEqual(wrapperBar.vm.actionIcon, 'clear')
        const wrapperAction = wrapperBar.find('.tm-notice-bar-action')
        assert.ok(wrapperAction.exists())
        wrapperAction.trigger('click')
        assert.ok(!wrapperBar.exists())
        assert.strictEqual(mockClear.callCount, 2)
        assert.deepStrictEqual(mockClear.getCall(0).args, [wrapperBar.vm.timerMove])
        assert.deepStrictEqual(mockClear.getCall(1).args, [wrapperBar.vm.timerRestore])
        assert.ok(wrapperBar.emitted('click'))
    })

    it('mode link', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <tm-notice-bar mode="link">
                        这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。
                    </tm-notice-bar>
                </div>
            `
        }, {
            localVue,
        })
        const wrapperBar = wrapper.find(TmNoticeBar)

        assert.strictEqual(wrapperBar.vm.actionIcon, 'arrow_forward')
        const wrapperAction = wrapperBar.find('.tm-notice-bar-action')
        assert.ok(wrapperAction.exists())
        wrapperAction.trigger('click')
        assert.ok(wrapperBar.exists())
        assert.ok(wrapperBar.emitted('click'))
    })

    it('mode other', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <tm-notice-bar mode="other">
                        这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。
                    </tm-notice-bar>
                </div>
            `
        }, {
            localVue,
        })
        const wrapperBar = wrapper.find(TmNoticeBar)

        assert.strictEqual(wrapperBar.vm.actionIcon, 'other')
        const wrapperAction = wrapperBar.find('.tm-notice-bar-action')
        assert.ok(wrapperAction.exists())
        wrapperAction.trigger('click')
        assert.ok(wrapperBar.exists())
        assert.ok(wrapperBar.emitted('click'))
    })

    it('slots action', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <tm-notice-bar mode="link">
                        这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。
                        <TestBasic slot="action" />
                    </tm-notice-bar>
                </div>
            `
        }, {
            localVue,
        })
        const wrapperBar = wrapper.find(TmNoticeBar)

        assert.strictEqual(wrapperBar.vm.actionIcon, 'arrow_forward')
        const wrapperAction = wrapperBar.find('.tm-notice-bar-action')
        assert.ok(wrapperAction.exists())
        assert.ok(wrapperAction.contains(TestBasic))
        wrapperAction.trigger('click')
        assert.ok(wrapperBar.exists())
        assert.ok(wrapperBar.emitted('click'))
    })

    it('无图标', async () => {
        const wrapper = mount(TmNoticeBar, {
            propsData: {
                icon: '',
            },
            slots: {
                default: '这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。',
            },
        })
        const wrapperIcon = wrapper.find('.tm-notice-bar-icon')
        assert.ok(!wrapperIcon.exists())
    })

    it('自定义动画时间', async () => {
        let mockOffsetWidth = 200
        const mockLinear = sinon.fake()
        RewireAPI.__Rewire__('linear', (...args) => {
            mockLinear(...args)
        })
        sinon.replaceGetter(HTMLDivElement.prototype, 'offsetWidth', () => {
            mockOffsetWidth += 1
            return mockOffsetWidth
        })
        sinon.replace(window, 'setTimeout', (...args) => {
            args[0]()
        })
        const wrapper = mount(TmNoticeBar, {
            propsData: {
                duration: 400,
            },
            slots: {
                default: '这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。',
            },
        })

        // 每次滚动耗时
        assert.strictEqual(mockLinear.getCall(0).args[3], 400)

        RewireAPI.__ResetDependency__('linear')
    })

    it('不循环滚动', async () => {
        let mockOffsetWidth = 200
        const mockLinear = sinon.fake()
        RewireAPI.__Rewire__('linear', (...args) => {
            mockLinear(...args)
            args[2](100, true)
        })
        sinon.replaceGetter(HTMLDivElement.prototype, 'offsetWidth', () => {
            mockOffsetWidth += 1
            return mockOffsetWidth
        })
        sinon.replace(window, 'setTimeout', (...args) => {
            args[0]()
        })
        const wrapper = mount(TmNoticeBar, {
            propsData: {
                loop: false,
            },
            slots: {
                default: '这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。',
            },
        })

        // 无限滚动
        assert.strictEqual(mockLinear.callCount, 1)

        RewireAPI.__ResetDependency__('linear')
    })

    afterEach(() => {
        sinon.restore()
    })
})
