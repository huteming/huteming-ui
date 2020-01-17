import assert from 'assert'
import TmField from '../src/main'
import { __RewireAPI__ as RewireAPI } from '../src/field'
import WorkBasic from 'tests/components/basic.vue'
import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import { sleep } from 'tests/helper'
import { Clear } from '../src/work'
const localVue = createLocalVue()
localVue.use(TmField)

describe('field', () => {
  afterEach(() => {
    sinon.restore()
  })

  // 默认 padding 4px
  describe('高度自适应', () => {
    it('不限制高度', async () => {
      sinon.replaceGetter(HTMLTextAreaElement.prototype, 'scrollHeight', () => {
        return 66
      })
      const wrap = mount(TmField, {
        propsData: {
          value: '',
          type: 'textarea',
          autosize: true,
        },
      })
      const styles = wrap.vm.styleInput
      assert.deepStrictEqual(styles, {
        height: '66px',
        minHeight: '62px',
      })
    })

    it('限制高度', async () => {
      let single = true
      // calcTextareaHeight中第一次获取为有value值的多行高度，第二次获取为单行高度
      sinon.replaceGetter(HTMLTextAreaElement.prototype, 'scrollHeight', () => {
        single = !single
        return single ? 100 : 100 * 6
      })
      const wrap = mount(TmField, {
        propsData: {
          value: 'hhh',
          type: 'textarea',
          autosize: {
            minRows: 4,
            maxRows: 5,
          },
        },
      })
      const styles = wrap.vm.styleInput
      assert.deepStrictEqual(styles, {
        'height': `${96 * 5}px`,
        'minHeight': `${96 * 4}px`,
      })
    })

    it('盒模型为border-box，高度加上边框高度', async () => {
      sinon.replace(window, 'getComputedStyle', () => {
        return {
          getPropertyValue (key) {
            switch (key) {
            case 'box-sizing':
              return 'border-box'
            case 'padding-bottom':
              return 1
            case 'padding-top':
              return 2
            case 'border-bottom-width':
              return 3
            case 'border-top-width':
              return 4
            default:
              return ''
            }
          },
        }
      })
      let single = true
      // calcTextareaHeight中第一次获取为有value值的多行高度，第二次获取为单行高度
      sinon.replaceGetter(HTMLTextAreaElement.prototype, 'scrollHeight', () => {
        single = !single
        return single ? 100 : 100 * 6
      })
      const wrap = mount(TmField, {
        propsData: {
          value: 'hhh',
          type: 'textarea',
          autosize: {
            minRows: 4,
            maxRows: 5,
          },
        },
      })
      const styles = wrap.vm.styleInput
      assert.deepStrictEqual(styles, {
        'height': `${(100 - 1 - 2) * 5 + 1 + 2 + 3 + 4}px`,
        'minHeight': `${(100 - 1 - 2) * 4 + 1 + 2 + 3 + 4}px`,
      })
    })

    it('盒模型为content-box，高度加上边框高度', async () => {
      sinon.replace(window, 'getComputedStyle', () => {
        return {
          getPropertyValue (key) {
            switch (key) {
            case 'box-sizing':
              return 'content-box'
            case 'padding-bottom':
              return 1
            case 'padding-top':
              return 2
            case 'border-bottom-width':
              return 3
            case 'border-top-width':
              return 4
            default:
              return ''
            }
          },
        }
      })
      let single = true
      // calcTextareaHeight中第一次获取为有value值的多行高度，第二次获取为单行高度
      sinon.replaceGetter(HTMLTextAreaElement.prototype, 'scrollHeight', () => {
        single = !single
        return single ? 100 : 100 * 6
      })
      const wrap = mount(TmField, {
        propsData: {
          value: 'hhh',
          type: 'textarea',
          autosize: {
            minRows: 4,
            maxRows: 5,
          },
        },
      })
      const styles = wrap.vm.styleInput
      assert.deepStrictEqual(styles, {
        'height': `${(100 - 1 - 2) * 5}px`,
        'minHeight': `${(100 - 1 - 2) * 4}px`,
      })
    })
  })

  it('显示清除控件', async () => {
      const wrap = mount(TmField, {
          propsData: {
              value: '',
              clearable: true,
          },
      })
      let clear
      clear = wrap.find(Clear)
      assert.strictEqual(clear.exists(), false)

      wrap.setProps({ value: 'hello' })
      await sleep()
      clear = wrap.find(Clear)
      assert.strictEqual(clear.exists(), true)
  })

  it('清除事件', async () => {
      const wrap = mount(TmField, {
        propsData: {
          value: 'hello',
          clearable: true,
        },
      })
      const clear = wrap.find(Clear)
      clear.trigger('click')
      const emitClear = wrap.emitted('clear')
      assert.ok(emitClear)
      assert.ok(emitClear[0][0] instanceof Event)
  })

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
