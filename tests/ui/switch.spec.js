import assert from 'assert'
import TmSwitch from 'web-ui/switch/src/app'
import { mount } from '@vue/test-utils'

describe('switch', () => {
    it('create', () => {
        const wrapper = mount(TmSwitch, {
            propsData: {
                value: true,
            },
        })
        assert.strictEqual(wrapper.vm.currentValue, true)
    })

    it('value change', () => {
        const wrapper = mount(TmSwitch, {
            propsData: {
                value: false,
            },
        })
        assert.strictEqual(wrapper.vm.currentValue, false)
        wrapper.setProps({ value: true })
        assert.strictEqual(wrapper.vm.currentValue, true)
    })

    it('click', () => {
        const wrapper = mount(TmSwitch, {
            propsData: {
                value: false,
            },
        })
        assert.strictEqual(wrapper.vm.currentValue, false)
        wrapper.trigger('click')
        assert.strictEqual(wrapper.vm.currentValue, true)
    })

    it('disabled', () => {
        const wrapper = mount(TmSwitch, {
            propsData: {
                value: false,
                disabled: true,
            },
        })
        assert.strictEqual(wrapper.vm.currentValue, false)
        wrapper.trigger('click')
        assert.strictEqual(wrapper.vm.currentValue, false)
    })
})
