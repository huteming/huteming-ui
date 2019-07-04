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

    it('confirm', () => {
        const wrapper = mount(TmToolbar)
        const wrapperConfirm = wrapper.find('.tm-toolbar-action-confirm')
        wrapperConfirm.trigger('click')
        assert.ok(wrapper.emitted().confirm)
    })

    it('cancel', () => {
        const wrapper = mount(TmToolbar)
        const wrapperCancel = wrapper.find('.tm-toolbar-action-cancel')
        wrapperCancel.trigger('click')
        assert.ok(wrapper.emitted().cancel)
    })

    it('隐藏确认按钮', () => {
        const wrapper = mount(TmToolbar, {
            propsData: {
                showConfirm: false,
            },
        })
        const wrapperConfirm = wrapper.find('.tm-toolbar-action-confirm')
        assert.ok(wrapperConfirm.isEmpty())

        wrapperConfirm.trigger('click')
        assert.ok(!wrapper.emitted('confirm'))
    })
})
