import CompAnchor from '../components/anchor'
import { mount } from '@vue/test-utils'
import assert from 'assert'
import { sleep, mockProperty } from '../helper'
import { __RewireAPI__ as RewireAPI } from 'web-ui/anchor/src/anchor'
import sinon from 'sinon'


describe('anchor', () => {
    let mockAnimation
    let mockScroll
    let count
    let mockElement

    beforeEach(() => {
        mockAnimation = sinon.fake()
        mockScroll = sinon.fake()
        count = 100
        mockElement = document.createElement('div')
        sinon.replaceGetter(document.body, 'clientWidth', () => {
            return 750
        })
        RewireAPI.__Rewire__('getScrollContainer', () => {
            return mockElement
        })
        RewireAPI.__Rewire__('getElementTop', () => count++)
        RewireAPI.__Rewire__('getScrollTop', () => count++)
        RewireAPI.__Rewire__('scrollY', (element, position) => {
            mockScroll(element, position)
        })
        RewireAPI.__Rewire__('easeOut', (from, to, callback, duration) => {
            mockAnimation(from, to, duration)
            callback(to / 2, false)
            callback(to, true)
        })
    })

    it('最后停留位置间隔顶部 top', () => {
        const wrapper = mount(CompAnchor, { attachToDocument: true })

        try {
            const wrapperBtn = wrapper.find('#btn3')
            wrapperBtn.trigger('click')

            assert.deepStrictEqual(mockAnimation.getCall(0).args, [100, 82, 300])
        } finally {
            wrapper.destroy()
        }
    })

    it('自动查找父元素滚动区域', () => {
        const wrapper = mount(CompAnchor, { attachToDocument: true })

        try {
            const wrapperBtn = wrapper.find('#btn2')
            wrapperBtn.trigger('click')

            assert.strictEqual(mockScroll.getCall(0).args[0], mockElement)
        } finally {
            wrapper.destroy()
        }
    })

    it('最后执行一次回调函数done', () => {
        const mockDone = sinon.fake()
        const wrapper = mount(CompAnchor, { attachToDocument: true, methods: {
            done: mockDone,
        }})

        try {
            const wrapperBtn = wrapper.find('#btn2')
            wrapperBtn.trigger('click')

            assert.strictEqual(mockDone.callCount, 1)
            assert.deepStrictEqual(mockDone.getCall(0).args, [102])
        } finally {
            wrapper.destroy()
        }
    })

    it('参数是字符串时作为选择器', () => {
        const wrapper = mount(CompAnchor, { attachToDocument: true })

        try {
            const wrapperBtn = wrapper.find('#btn4')

            const selector = wrapperBtn.element['@@Anchor'].self.config.selector
            assert.strictEqual(selector, '#target')
        } finally {
            wrapper.destroy()
        }
    })

    it('选择器不存在打印警告', () => {
        const wrapper = mount(CompAnchor, { attachToDocument: true })
        const mockWarn = sinon.fake()
        sinon.replace(console, 'warn', mockWarn)

        try {
            const wrapperBtn = wrapper.find('#btn5')
            wrapperBtn.trigger('click')

            assert.strictEqual(mockWarn.callCount, 1)
        } finally {
            wrapper.destroy()
        }
    })

    it('点击之后才查找滚动区域', () => {
        const wrapper = mount(CompAnchor, { attachToDocument: true })

        try {
            const wrapperBtn = wrapper.find('#btn1')
            assert.strictEqual(wrapperBtn.element['@@Anchor'].self.clickEventTarget, null)
        } finally {
            wrapper.destroy()
        }
    })

    it('重复点击不再查找滚动区域', () => {
        const wrapper = mount(CompAnchor, { attachToDocument: true })
        const originElement = mockElement

        try {
            const wrapperBtn = wrapper.find('#btn2')
            wrapperBtn.trigger('click')
            mockElement = null
            wrapperBtn.trigger('click')
            assert.strictEqual(wrapperBtn.element['@@Anchor'].self.scrollEventTarget, originElement)
        } finally {
            wrapper.destroy()
        }
    })

    afterEach(() => {
        RewireAPI.__ResetDependency__('getElementTop')
        RewireAPI.__ResetDependency__('getScrollTop')
        RewireAPI.__ResetDependency__('easeOut')
        RewireAPI.__ResetDependency__('scrollY')
        RewireAPI.__ResetDependency__('getScrollContainer')
        sinon.restore()
    })
})
