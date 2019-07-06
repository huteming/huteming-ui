import assert from 'assert'
import TmField from 'web-ui/field/src'
import WorkBasic from '../components/basic'
import { mount } from '@vue/test-utils'

describe('field', () => {
    it('name', () => {
        assert.strictEqual(TmField.name, 'TmField')
    })

    it('value为null、undefined', () => {
        const wrapper = mount(TmField, {
            propsData: {
                value: null,
            },
        })
        assert.strictEqual(wrapper.vm.nativeInputValue, '')
        wrapper.setProps({ value: undefined })
        assert.strictEqual(wrapper.vm.nativeInputValue, '')
    })

    it('event change value', () => {
        const wrapper = mount(TmField)
        const wrapperInput = wrapper.find('.tm-field__input')
        // wrapperInput.setValue('hello')
        wrapperInput.element.value = 'hello'
        wrapperInput.trigger('input')
        wrapperInput.trigger('change')

        const emitInput = wrapper.emitted('input')
        const emitChange = wrapper.emitted('change')
        assert.strictEqual(emitInput.length, 1)
        assert.deepStrictEqual(emitInput[0], ['hello'])
        assert.strictEqual(emitChange.length, 1)
        assert.deepStrictEqual(emitChange[0], ['hello'])
    })

    it('event focus,blur', () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmField />
                    <WorkBasic />
                </div>
            `,
            components: {
                TmField,
                WorkBasic,
            },
        })
        const wrapperField = wrapper.find(TmField)
        const wrapperInput = wrapper.find('.tm-field__input')
        const wrapperBasic = wrapper.find(WorkBasic)
        wrapperInput.element.focus()
        wrapperInput.element.blur()
        const emitFocus = wrapperField.emitted('focus')
        const emitBlur = wrapperField.emitted('blur')
        assert.strictEqual(emitFocus.length, 1)
        assert.ok(emitFocus[0][0] instanceof Event)
        assert.strictEqual(emitBlur.length, 1)
        assert.ok(emitBlur[0][0] instanceof Event)
    })

    it('event compositionstart', () => {
        const wrapper = mount(TmField)
        const wrapperInput = wrapper.find('.tm-field__input')
        wrapperInput.element.value = 'hello'
        wrapperInput.trigger('compositionstart')
        wrapperInput.trigger('input')

        const emitInput = wrapper.emitted('input')
        assert.ok(!emitInput)
    })

    it('event compositionend', () => {
        const wrapper = mount(TmField)
        const wrapperInput = wrapper.find('.tm-field__input')
        wrapperInput.element.value = 'hello'
        wrapperInput.trigger('compositionend')

        const emitInput = wrapper.emitted('input')
        assert.ok(emitInput)
        assert.strictEqual(emitInput[0][0], 'hello')
    })
})
