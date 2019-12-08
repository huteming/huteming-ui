import assert from 'assert'
import { __RewireAPI__ as RewireAPI } from '../src/directive'
import Loading from '../src/main'
import { mount, createLocalVue, createWrapper } from '@vue/test-utils'
import sinon from 'sinon'
import { Mock, sleep } from 'tests/helper'
const scope = '@@Loading'
const localVue = createLocalVue()
localVue.use(Loading)

describe('loading', () => {
    let mockGet
    let mockSet
    let mock

    beforeAll(() => {
        RewireAPI.__Rewire__('getStyle', () => {
            return 'custom'
        })
    })

    beforeEach(() => {
        mockGet = sinon.fake()
        mockSet = sinon.fake()
        mock = new Mock(CSSStyleDeclaration.prototype, 'visibility', {
            get () {
                mockGet()
                return 'get'
            },
            set (...args) {
                mockSet(...args)
            },
        })
        mock.replace()
    })

    it('bind', async () => {
        const wrapper = mount({
            template: `
                <div v-loading="true"></div>
            `,
        }, {
            localVue,
        })
        await sleep(50)
        const wrapperLoading = createWrapper(wrapper.element[scope].instance)
        assert.strictEqual(wrapperLoading.vm.enterActiveClass, '')
        assert.ok(wrapperLoading.isVisible())

        // assert.strictEqual(mockSet.callCount, 3)
        // assert.deepStrictEqual(mockSet.getCall(0).args, ['hidden'])
        // assert.deepStrictEqual(mockSet.getCall(1).args, ['visible'])
        // assert.deepStrictEqual(mockSet.getCall(2).args, ['custom'])
        assert.ok(mockSet.called)
    })

    it('update', async () => {
        const wrapper = mount({
            template: `
                <div v-loading="loading"></div>
            `,
            data () {
                return {
                    loading: false,
                }
            },
        }, {
            localVue,
            stubs: {
                transition: false,
            },
        })
        wrapper.setData({ loading: true })
        // 证明不设置遮层
        assert.strictEqual(mockSet.callCount, 0)
        await sleep()
        // 证明无动画
        const wrapperLoading = wrapper.find('.tm-loading')
        assert.ok(wrapperLoading.classes('fade-enter-active'))
    })

    it('子组件更新 && loading为true', async () => {
        const wrapper = mount({
            template: `
                <div v-loading="loading">{{ text }}</div>
            `,
            data () {
                return {
                    loading: true,
                    text: 'text',
                }
            },
        }, {
            localVue,
            stubs: {
                transition: false,
            },
        })
        await sleep()
        wrapper.setData({ text: 'new text' })
        await sleep()
        const wrapperLoading = wrapper.findAll('.tm-loading')
        assert.strictEqual(wrapperLoading.length, 1)
    })

    it('子组件更新 && loading为false', async () => {
        const wrapper = mount({
            template: `
                <div v-loading="loading">{{ text }}</div>
            `,
            data () {
                return {
                    loading: false,
                    text: 'text',
                }
            },
        }, {
            localVue,
            stubs: {
                transition: false,
            },
        })
        await sleep()
        wrapper.setData({ text: 'new text' })
        await sleep()
        const wrapperLoading = wrapper.find('.tm-loading')
        assert.ok(!wrapperLoading.exists())
    })

    it('监听打开事件延迟关闭', async () => {
        const wrapper = mount({
            template: `
                <div v-loading="{ loading, duration, openAnimation: false, closeAnimation: false }">{{ text }}</div>
            `,
            data () {
                return {
                    loading: true,
                    duration: 0,
                    text: 'text',
                }
            },
        }, {
            localVue,
            stubs: {
            },
        })
        await sleep()
        const wrapperLoading = createWrapper(wrapper.element[scope].instance)
        const mockAfterEnter = sinon.fake()
        // 模拟方法，防止动画结束自动执行关闭
        sinon.replace(wrapperLoading.vm, 'handleAfterEnter', mockAfterEnter)
        // 模拟数据，表示dom为插入文档
        wrapperLoading.vm.openTime = 0

        wrapper.setData({ loading: false })
        await sleep(40)
        assert.ok(wrapperLoading.exists())
        wrapperLoading.vm.$emit('ready')
        await sleep(40)
        assert.ok(!wrapperLoading.exists())
    })

    it('超过最小持续时间', async () => {
        const wrapper = mount({
            template: `
                <div v-loading="{ loading, duration }">{{ text }}</div>
            `,
            data () {
                return {
                    loading: true,
                    duration: 20,
                    text: 'text',
                }
            },
        }, {
            localVue,
        })
        await sleep(50 + 25)
        wrapper.setData({ loading: false })
        await sleep(50)
        const wrapperLoading = wrapper.find('.tm-loading')
        assert.ok(!wrapperLoading.exists())
    })

    it('等待最小持续时间', async () => {
        const wrapper = mount({
            template: `
                <div v-loading="{ loading, duration }">{{ text }}</div>
            `,
            data () {
                return {
                    loading: true,
                    duration: 20,
                    text: 'text',
                }
            },
        }, {
            localVue,
        })
        await sleep(50)
        wrapper.setData({ loading: false })
        await sleep()
        const wrapperLoading = wrapper.find('.tm-loading')
        assert.ok(wrapperLoading.exists())
    })

    it('unbind', async () => {
        const mockClose = sinon.fake()
        RewireAPI.__Rewire__('close', mockClose)

        const wrapper = mount({
            template: `
                <div v-loading="true">{{ text }}</div>
            `,
            data () {
                return {
                    text: 'text',
                }
            },
        }, {
            localVue,
            stubs: {
            },
        })
        await sleep()
        wrapper.destroy()
        assert.ok(mockClose.calledWithExactly(wrapper.element, { duration: 0 }))

        RewireAPI.__ResetDependency__('close')
    })

    it('open', async () => {
        const mockOpen = sinon.fake()
        const mockEl = 'el'
        RewireAPI.__Rewire__('open', mockOpen)
        Loading.open(mockEl, true)
        assert.ok(mockOpen.calledWithExactly(mockEl, {
            text: '',
            textStyle: {},
            background: '',
            openAnimation: true,
            closeAnimation: true,
            duration: 500,
            loading: true,
        }))

        RewireAPI.__ResetDependency__('open')
    })

    it('close', () => {
        const mockClose = sinon.fake()
        const mockEL = 'el'
        RewireAPI.__Rewire__('close', mockClose)
        Loading.close(mockEL, false)
        assert.ok(mockClose.calledWithExactly(mockEL, {
            text: '',
            textStyle: {},
            background: '',
            openAnimation: true,
            closeAnimation: true,
            duration: 500,
            loading: false,
        }))

        RewireAPI.__ResetDependency__('close')
    })

    afterEach(() => {
        mock.restore()
        sinon.restore()
    })

    afterAll(() => {
        RewireAPI.__ResetDependency__('getStyle')
    })
})
