import { mount, createLocalVue } from '@vue/test-utils'
import TmToolbar from '../src/main'
import assert from 'assert'
const localVue = createLocalVue()
localVue.use(TmToolbar)

describe('toolbar', () => {
    it('create', () => {
        const wrapper = mount(TmToolbar)
        const wrapperCancel = wrapper.find('.tm-toolbar__cancel')
        const wrapperConfirm = wrapper.find('.tm-toolbar__confirm')
        assert.strictEqual(wrapperCancel.text(), '取消')
        assert.strictEqual(wrapperConfirm.text(), '确定')
    })

    it('confirm', () => {
        const wrapper = mount(TmToolbar)
        const wrapperConfirm = wrapper.find('.tm-toolbar__confirm')
        wrapperConfirm.trigger('click')
        assert.ok(wrapper.emitted().confirm)
    })

    it('cancel', () => {
        const wrapper = mount(TmToolbar)
        const wrapperCancel = wrapper.find('.tm-toolbar__cancel')
        wrapperCancel.trigger('click')
        assert.ok(wrapper.emitted().cancel)
    })

    it('隐藏确认按钮', () => {
        const wrapper = mount(TmToolbar, {
            propsData: {
                showConfirm: false,
            },
        })
        const wrapperConfirm = wrapper.find('.tm-toolbar__confirm')
        assert.ok(wrapperConfirm.isEmpty())

        wrapperConfirm.trigger('click')
        assert.ok(!wrapper.emitted('confirm'))
    })
})
