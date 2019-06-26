import { mount } from '@vue/test-utils'
import TmToolbar from 'web-ui/toolbar/src/toolbar'
import assert from 'assert'

describe('toolbar', () => {
    it('create', () => {
        const wrapper = mount(TmToolbar)
        const wrapperCancel = wrapper.find('.tm-toolbar-action-cancel')
        const wrapperConfirm = wrapper.find('.tm-toolbar-action-confirm')
        assert.strictEqual(wrapperCancel.text(), '取消')
        assert.strictEqual(wrapperConfirm.text(), '确定')
    })

    describe('event', () => {
        it('confirm', () => {
            const wrapper = mount(TmToolbar)
            const wrapperConfirm = wrapper.find('.tm-toolbar-action-confirm')
            wrapperConfirm.trigger('click')
            assert.ok(wrapper.emitted().confirm)
        })

        it('confirm', () => {
            const wrapper = mount(TmToolbar)
            const wrapperCancel = wrapper.find('.tm-toolbar-action-cancel')
            wrapperCancel.trigger('click')
            assert.ok(wrapper.emitted().cancel)
        })
    })
})
