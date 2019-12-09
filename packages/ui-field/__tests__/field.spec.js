import assert from 'assert'
import TmField from '../src/main'
import { __RewireAPI__ as RewireAPI } from '../src/field'
import WorkBasic from 'tests/components/basic.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
const localVue = createLocalVue()
localVue.use(TmField)

describe('field', () => {
    it('还原滚动条', () => {
        const mockGetScrollTop = sinon.fake.returns(30)
        const mockScroll = sinon.fake()
        RewireAPI.__Rewire__('getScrollTop', mockGetScrollTop)
        RewireAPI.__Rewire__('scrollY', mockScroll)

        const wrapper = mount(TmField)
        // 模拟滚动位置
        const wrapperField = wrapper.find(TmField)
        wrapperField.vm.focus()
        // 模拟滚动位置
        wrapperField.vm.blur()

        assert.strictEqual(mockGetScrollTop.callCount, 1)
        assert.ok(mockGetScrollTop.calledWithExactly(window))
        assert.strictEqual(mockScroll.callCount, 1)
        assert.ok(mockScroll.calledWithExactly(window, 30))

        RewireAPI.__ResetDependency__('getScrollTop')
        RewireAPI.__ResetDependency__('scrollY')
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
        const wrapperInput = wrapper.find('input')
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
        const wrapperInput = wrapper.find('input')
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
        const wrapperInput = wrapper.find({ ref: 'field' })
        wrapperInput.element.value = 'hello'
        wrapperInput.trigger('compositionstart')
        wrapperInput.trigger('input')

        const emitInput = wrapper.emitted('input')
        assert.ok(!emitInput)
    })

    it('event compositionend', () => {
        const wrapper = mount(TmField)
        const wrapperInput = wrapper.find({ ref: 'field' })
        wrapperInput.element.value = 'hello'
        wrapperInput.trigger('compositionend')

        const emitInput = wrapper.emitted('input')
        assert.ok(emitInput)
        assert.deepStrictEqual(emitInput[0], ['hello'])
    })

    it('设置textarea rows属性', () => {
        const wrap = mount(TmField, {
            propsData: {
                type: 'textarea',
                rows: 3,
            },
        })
        const textarea = wrap.find('textarea')
        assert.strictEqual(textarea.attributes('rows'), '3')
    })
})