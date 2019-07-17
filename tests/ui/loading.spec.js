import assert from 'assert'
import Loading, { __RewireAPI__ as RewireAPI } from 'web-ui/loading/src/loading.js'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import { Mock, sleep } from '../helper'
const scope = '@@Loading'
const localVue = createLocalVue()
localVue.directive(Loading.name, Loading)

describe('loading', () => {
    let mockGet
    let mockSet
    let mock

    beforeAll(() => {
        RewireAPI.__Rewire__('getStyle', () => {
            return 'visible'
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
            stubs: {
                transition: false,
            },
        })
        // 证明设置了遮层
        assert.deepStrictEqual(mockSet.getCall(0).args, ['hidden'])
        await sleep()
        // 证明无动画
        const wrapperLoading = wrapper.find('.tm-loading')
        assert.ok(!wrapperLoading.classes('tm-loading-transition'))
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
        assert.ok(wrapperLoading.classes('tm-loading-transition'))
    })

    it('重复打开只会打开一次', async () => {
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
        const mockOpen = sinon.fake()
        RewireAPI.__Rewire__('open', mockOpen)

        wrapper.setData({ text: 'new text' })

        assert.strictEqual(mockOpen.callCount, 0)

        RewireAPI.__ResetDependency__('open')
    })

    it('重复关闭只会关闭一次', async () => {
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
        const mockClose = sinon.fake()
        RewireAPI.__Rewire__('close', mockClose)

        wrapper.setData({ text: 'new text' })

        assert.strictEqual(mockClose.callCount, 0)

        RewireAPI.__ResetDependency__('close')
    })

    it('超过最小持续时间', async () => {
        const wrapper = mount({
            template: `
                <div v-loading="{ loading, duration, openAnimation: false, closeAnimation: false }">{{ text }}</div>
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
            stubs: {
            },
        })
        await sleep(40 + 25)
        wrapper.setData({ loading: false })
        await sleep(40)
        const wrapperLoading = wrapper.find('.tm-loading')
        assert.ok(!wrapperLoading.exists())
    })

    it('监听打开事件延迟关闭', async () => {
        const wrapper = mount({
            template: `
                <div v-loading="{ loading, duration, closeAnimation: false }">{{ text }}</div>
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
            stubs: {
            },
        })
        await sleep()
        wrapper.setData({ loading: false })
        await sleep()
        const wrapperLoading = wrapper.find('.tm-loading')
        assert.ok(wrapperLoading.exists())
    })

    it('等待最小持续时间', async () => {
        const wrapper = mount({
            template: `
                <div v-loading="{ loading, duration, closeAnimation: false }">{{ text }}</div>
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
            stubs: {
            },
        })
        await sleep(40)
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

    afterEach(() => {
        mock.restore()
    })

    afterAll(() => {
        RewireAPI.__ResetDependency__('getStyle')
    })
})
