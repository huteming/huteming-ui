import SmartScroll, { __RewireAPI__ as RewireAPI } from 'web-ui/smart-scroll/src/smart-scroll.js'
import assert from 'assert'
import { Mock } from '../helper'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
const scope = '@@SmartScroll'
const localVue = createLocalVue()
localVue.directive(SmartScroll.name, SmartScroll)

describe('smart-scroll', () => {
    let mock1
    let mock2
    let mockPrevent

    beforeEach(() => {
        mockPrevent = sinon.fake()
        mock1 = new Mock(Event.prototype, 'preventDefault', {
            value: mockPrevent,
        })
        mock2 = new Mock(Event.prototype, 'cancelable', {
            value: true,
        })
        mock1.replace()
        mock2.replace()
    })

    it('没有可滚动区域', () => {
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
            cancelable: true,
        })
        wrapperContainer.trigger('touchend')
        assert.ok(mockPrevent.called)

        RewireAPI.__ResetDependency__('getScrollContainer')
    })

    it('允许滚动', () => {
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
            cancelable: true,
        })
        wrapperContainer.trigger('touchend')
        assert.ok(mockPrevent.notCalled)
    })

    it('禁止滚动', () => {
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
            cancelable: true,
        })
        wrapperContainer.trigger('touchend')
        assert.ok(mockPrevent.called)
    })

    it('上边缘', () => {
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
            cancelable: true,
        })
        wrapperContainer.trigger('touchend')
        assert.ok(mockPrevent.called)
    })

    it('下边缘', () => {
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
            cancelable: true,
        })
        wrapperContainer.trigger('touchend')
        assert.ok(mockPrevent.called)
    })

    afterEach(() => {
        mock1.restore()
        mock2.restore()
        sinon.restore()
    })
})
