import { mount, createLocalVue } from '@vue/test-utils'
import CompBtnPay from '../src/btn-pay'
import WorkBasic from 'tests/components/basic'
import assert from 'assert'
import { Button } from '../src/work'
const localVue = createLocalVue()

describe('btn-pay', () => {
    it('install', () => {
        const Plugin = require('../src/main').default
        localVue.use(Plugin)
        assert.ok(localVue.component('TmBtnPay'))
    })

    describe('disabled', () => {
      it('依旧传递点击事件', () => {
        const wrapper = mount(CompBtnPay, {
            propsData: {
                btn: 'btn',
                disabled: true,
            },
        })
        const wrapperBtn = wrapper.find(Button)
        wrapperBtn.trigger('click')

        const emitClick = wrapper.emitted('click')
        assert.ok(emitClick)
      })

      it('按钮显示disabled样式', () => {
        const wrap = mount(CompBtnPay, {
            propsData: {
              btn: 'btn',
              disabled: true,
            },
        })
        const btn = wrap.find(Button)
        assert.strictEqual(btn.vm.disabled, true)
      })
    })

    describe('title', () => {
        it('没有前缀时，显示的标题字体更大', () => {
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    titlePrefix: '',
                },
            })

            const wrapperTitle = wrapper.find({ ref: 'title' })
            assert.strictEqual(wrapperTitle.vm.large, true)
        })

        it('显示props.title', () => {
            const title = 'this is an title'
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    title,
                },
            })

            const wrapperTitle = wrapper.find({ ref: 'title' })
            assert.ok(wrapperTitle.exists())
            assert.strictEqual(wrapperTitle.text(), title)
        })

        it('自定义样式', () => {
            const color = 'rgb(170, 187, 204)'
            const titleStyle = { color }
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    titleStyle,
                },
            })

            const wrapperTitle = wrapper.find({ ref: 'title' })
            assert.strictEqual(wrapperTitle.attributes('style'), `color: ${color};`)
        })
    })

    describe('tip', () => {
        it('显示props.tip', () => {
            const tip = 'llll'
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    tip,
                },
            })

            const wrapperTip = wrapper.find({ ref: 'tip' })
            assert.strictEqual(wrapperTip.text(), tip)
        })
        it('自定义样式', () => {
            const color = 'rgb(170, 187, 204)'
            const tipStyle = { color }
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    tipStyle,
                },
            })

            const wrapperTip = wrapper.find({ ref: 'tip' })
            assert.strictEqual(wrapperTip.attributes('style'), `color: ${color};`)
        })
        it('tip不显示删除线', () => {
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    tipThrough: false,
                },
            })

            const wrapperTip = wrapper.find({ ref: 'tip' })
            assert.strictEqual(wrapperTip.vm.through, false)
        })
    })

    describe('desc', () => {
        it('显示props.desc', () => {
            const desc = 'llll'
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    desc,
                },
            })

            const wrapperDesc = wrapper.find({ ref: 'desc' })
            assert.strictEqual(wrapperDesc.text(), desc)
        })

        it('自定义样式', () => {
            const color = 'rgb(170, 187, 204)'
            const descStyle = { color }
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    descStyle,
                },
            })

            const wrapperDesc = wrapper.find({ ref: 'desc' })
            assert.strictEqual(wrapperDesc.attributes('style'), `color: ${color};`)
        })

        it('desc添加删除线', () => {
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    descThrough: true,
                },
            })

            const wrapperTip = wrapper.find({ ref: 'desc' })
            assert.ok(wrapperTip.vm.through)
        })
    })

    describe('btn', () => {
      it('显示内容', () => {
        const btn = 'llll'
        const wrapper = mount(CompBtnPay, {
            propsData: {
                btn,
            },
        })

        const wrapperBtn = wrapper.find(Button)
        assert.strictEqual(wrapperBtn.text(), btn)
      })

        it('自定义内容', () => {
            const wrapper = mount(CompBtnPay, {
                slots: {
                    btn: WorkBasic,
                }
            })

            assert.strictEqual(wrapper.contains(WorkBasic), true)
        })

        it('自定义样式', () => {
            const color = 'rgb(170, 187, 204)'
            const btnStyle = { color }
            const wrapper = mount(CompBtnPay, {
                propsData: {
                    btnStyle,
                },
            })

            const wrapperBtn = wrapper.find(Button)
            assert.strictEqual(wrapperBtn.attributes('style'), `color: ${color};`)
        })
    })

  describe('events', () => {
    it('click', () => {
      const wrapper = mount(CompBtnPay, {
        propsData: {
          btn: 'btn',
        },
      })
      const wrapperBtn = wrapper.find(Button)
      wrapperBtn.trigger('click')

      assert.ok(wrapper.emitted('click'))
    })
  })
})
