import SmartScroll, { __RewireAPI__ as RewireAPI } from 'web-ui/smart-scroll/src/main'
import assert from 'assert'
import { Mock, mockCancelable } from '../helper'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
const scope = '@@SmartScroll'
const localVue = createLocalVue()
localVue.directive(SmartScroll.name, SmartScroll)

describe('smart-scroll', () => {
    let mock1
    let mockPrevent

    beforeEach(() => {
        mockPrevent = sinon.fake()
        mock1 = new Mock(Event.prototype, 'preventDefault', {
            value: mockPrevent,
        })
        mock1.replace()
    })

    it('没有可滚动区域', () => {
        const restore = mockCancelable()
        RewireAPI.__Rewire__('getScrollContainer', (el) => {
            return null
        })

        const wrapper = mount({
            template: `
                <div id="scrollable" v-smart-scroll>
                </div>
            `,
        }, {
            localVue,
        })
        const wrapperContainer = wrapper.find('#scrollable')
        wrapperContainer.trigger('touchstart', {
            changedTouches: [{ pageY: 10 }],
        })
        wrapperContainer.trigger('touchmove', {
            changedTouches: [{ pageY: 100 }],
        })
        wrapperContainer.trigger('touchend')
        assert.ok(mockPrevent.called)

        RewireAPI.__ResetDependency__('getScrollContainer')
        restore()
    })

    it('允许滚动', () => {
        const restore = mockCancelable()
        const wrapper = mount({
            template: `
                <div style="overflowY: auto;" id="scrollable" v-smart-scroll>
                </div>
            `,
        }, {
            localVue,
        })
        const wrapperContainer = wrapper.find('#scrollable')
        const domContainer = wrapperContainer.element
        sinon.replaceGetter(domContainer, 'scrollHeight', () => {
            return 100
        })
        sinon.replaceGetter(domContainer, 'clientHeight', () => {
            return 10
        })
        domContainer.scrollTop = 50
        wrapperContainer.trigger('touchstart', {
            changedTouches: [{ pageY: 10 }],
        })
        wrapperContainer.trigger('touchmove', {
            changedTouches: [{ pageY: 100 }],
        })
        wrapperContainer.trigger('touchend')
        assert.ok(mockPrevent.notCalled)

        restore()
    })

    it('禁止滚动', () => {
        const restore = mockCancelable()
        const wrapper = mount({
            template: `
                <div style="overflowY: auto;" id="scrollable" v-smart-scroll>
                </div>
            `,
        }, {
            localVue,
        })
        const wrapperContainer = wrapper.find('#scrollable')
        const domContainer = wrapperContainer.element
        sinon.replaceGetter(domContainer, 'scrollHeight', () => {
            return 0
        })
        sinon.replaceGetter(domContainer, 'clientHeight', () => {
            return 100
        })
        domContainer.scrollTop = 0
        wrapperContainer.trigger('touchstart', {
            changedTouches: [{ pageY: 10 }],
        })
        wrapperContainer.trigger('touchmove', {
            changedTouches: [{ pageY: 100 }],
        })
        wrapperContainer.trigger('touchend')
        assert.ok(mockPrevent.called)

        restore()
    })

    it('上边缘', () => {
        const restore = mockCancelable()
        const wrapper = mount({
            template: `
                <div style="overflowY: auto;" id="scrollable" v-smart-scroll>
                </div>
            `,
        }, {
            localVue,
        })
        const wrapperContainer = wrapper.find('#scrollable')
        const domContainer = wrapperContainer.element
        sinon.replaceGetter(domContainer, 'scrollHeight', () => {
            return 100
        })
        sinon.replaceGetter(domContainer, 'clientHeight', () => {
            return 10
        })
        domContainer.scrollTop = 0
        wrapperContainer.trigger('touchstart', {
            changedTouches: [{ pageY: 10 }],
        })
        wrapperContainer.trigger('touchmove', {
            changedTouches: [{ pageY: 100 }],
        })
        wrapperContainer.trigger('touchend')
        assert.ok(mockPrevent.called)

        restore()
    })

    it('下边缘', () => {
        const restore = mockCancelable()
        const wrapper = mount({
            template: `
                <div style="overflowY: auto;" id="scrollable" v-smart-scroll>
                </div>
            `,
        }, {
            localVue,
        })
        const wrapperContainer = wrapper.find('#scrollable')
        const domContainer = wrapperContainer.element
        sinon.replaceGetter(domContainer, 'scrollHeight', () => {
            return 100
        })
        sinon.replaceGetter(domContainer, 'clientHeight', () => {
            return 10
        })
        domContainer.scrollTop = 100
        wrapperContainer.trigger('touchstart', {
            changedTouches: [{ pageY: 100 }],
        })
        wrapperContainer.trigger('touchmove', {
            changedTouches: [{ pageY: 10 }],
        })
        wrapperContainer.trigger('touchend')
        assert.ok(mockPrevent.called)

        restore()
    })

    it('disabled', () => {
        const restore = mockCancelable()
        RewireAPI.__Rewire__('getScrollContainer', (el) => {
            return null
        })

        const wrapper = mount({
            template: `
                <div id="scrollable" v-smart-scroll="disabled">
                </div>
            `,
            data () {
                return {
                    disabled: true,
                }
            },
        }, {
            localVue,
        })
        const wrapperContainer = wrapper.find('#scrollable')
        wrapperContainer.trigger('touchstart', {
            changedTouches: [{ pageY: 10 }],
        })
        wrapperContainer.trigger('touchmove', {
            changedTouches: [{ pageY: 100 }],
        })
        wrapperContainer.trigger('touchend')
        assert.ok(mockPrevent.notCalled)

        RewireAPI.__ResetDependency__('getScrollContainer')
        restore()
    })

    it('cancelable is false', () => {
        const restore = mockCancelable(false)
        RewireAPI.__Rewire__('getScrollContainer', (el) => {
            return null
        })

        const wrapper = mount({
            template: `
                <div id="scrollable" v-smart-scroll>
                </div>
            `,
            data () {
                return {
                }
            },
        }, {
            localVue,
        })
        const wrapperContainer = wrapper.find('#scrollable')
        wrapperContainer.trigger('touchstart', {
            changedTouches: [{ pageY: 10 }],
        })
        wrapperContainer.trigger('touchmove', {
            changedTouches: [{ pageY: 100 }],
        })
        wrapperContainer.trigger('touchend')
        assert.ok(mockPrevent.notCalled)

        RewireAPI.__ResetDependency__('getScrollContainer')
        restore()
    })

    it('callback', () => {
        const restore = mockCancelable()
        RewireAPI.__Rewire__('getScrollContainer', (el) => {
            return null
        })
        const mockCallback = sinon.fake()
        const wrapper = mount({
            template: `
                <div id="scrollable" v-smart-scroll="callback">
                </div>
            `,
            methods: {
                callback: mockCallback,
            },
        }, {
            localVue,
        })
        const wrapperContainer = wrapper.find('#scrollable')
        wrapperContainer.trigger('touchstart', {
            changedTouches: [{ pageY: 10, pageX: 10 }],
        })
        wrapperContainer.trigger('touchmove', {
            changedTouches: [{ pageY: 100, pageX: 200 }],
        })
        wrapperContainer.trigger('touchend')
        assert.ok(mockPrevent.called)
        assert.ok(mockCallback.calledWithExactly({ moveX: 190, moveY: 90 }))

        RewireAPI.__ResetDependency__('getScrollContainer')
        restore()
    })

    afterEach(() => {
        mock1.restore()
        sinon.restore()
    })
})
