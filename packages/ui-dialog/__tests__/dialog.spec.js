/**
 * 由于 modal 是只会创建一个实例，所以必须在每个测试结束关闭 modal
 */
import TmDialog from '../src/main'
import WorkBasic from 'tests/components/basic'
import assert from 'assert'
import { mount, config, TransitionStub, shallowMount, createLocalVue } from '@vue/test-utils'
import { sleep, Mock } from 'tests/helper'
import sinon from 'sinon'
import { CancelBottom, CancelInLeft, CancelInRight, CancelOutLeft, CancelOutRight, Line } from '../src/work'
const localVue = createLocalVue()
localVue.use(TmDialog)
localVue.component(WorkBasic.name, WorkBasic)

config.stubs.transition = false

describe('dialog', () => {
    it('默认props', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <tm-dialog v-model="visible">
                        <WorkBasic />
                    </tm-dialog>
                </div>
            `,
            data () {
                return {
                    visible: true,
                }
            },
            methods: {
            },
            components: {
                WorkBasic,
            },
        }, {
            localVue,
        })
        const wrapperDialog = wrapper.find(TmDialog)
        const { closePosition, closeOnClickModal } = wrapperDialog.vm
        assert.strictEqual(closePosition, 'bottom')
        assert.strictEqual(closeOnClickModal, false)
        wrapper.setData({ visible: false })
    })

    it('click冒泡', async () => {
        const wrapper = mount({
            template: `
                <div @click="handleCapture">
                    <tm-dialog v-model="visible">
                        <WorkBasic />
                    </tm-dialog>
                </div>
            `,
            data () {
                return {
                    visible: true,
                    isCapture: false,
                }
            },
            methods: {
                handleCapture () {
                    this.isCapture = true
                },
            },
            components: {
                TmDialog,
                WorkBasic,
            },
        })
        await sleep()
        const wrapperBasic = wrapper.find(WorkBasic)
        wrapperBasic.trigger('click')
        assert.strictEqual(wrapper.vm.isCapture, false)
        wrapper.setData({ visible: false })
    })

    // it('禁止touchmove冒泡 && 禁止滚动', async () => {
    //     const mockPrevent = sinon.fake()
    //     const mock = new Mock(Event.prototype, 'preventDefault', {
    //         value: mockPrevent,
    //     })
    //     mock.replace()

    //     const wrapper = mount({
    //         template: `
    //             <div @touchmove="handleCapture">
    //                 <tm-dialog v-model="visible">
    //                     <WorkBasic />
    //                 </tm-dialog>
    //             </div>
    //         `,
    //         data () {
    //             return {
    //                 visible: true,
    //                 isCapture: false,
    //             }
    //         },
    //         methods: {
    //             handleCapture () {
    //                 this.isCapture = true
    //             },
    //         },
    //         components: {
    //             TmDialog,
    //             WorkBasic,
    //         },
    //     })

    //     try {
    //         await sleep()
    //         const wrapperBasic = wrapper.find(WorkBasic)
    //         wrapperBasic.trigger('touchmove')
    //         assert.strictEqual(wrapper.vm.isCapture, false)
    //         assert.ok(mockPrevent.called)
    //     } finally {
    //         wrapper.setData({ visible: false })
    //         mock.restore()
    //     }
    // })

    it('create', async () => {
      const wrapper = mount(TmDialog, {
        propsData: {
          value: false,
        },
        stubs: {
          Transition: TransitionStub,
        },
      })

      assert.ok(!wrapper.isVisible())
      wrapper.setProps({ value: true })
      await sleep()

      assert.ok(wrapper.isVisible())
      assert.ok(wrapper.emitted('open'))
      wrapper.setProps({ value: false })
      await sleep()

      assert.ok(!wrapper.isVisible())
      assert.ok(wrapper.emitted('close'))

      const emitInput = wrapper.emitted('input')
      assert.strictEqual(emitInput.length, 2)
      assert.deepStrictEqual(emitInput[0], [true, false])
      assert.deepStrictEqual(emitInput[1], [false, true])
    })

    it('before close', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmDialog v-model="visible" :before-close="handleBeforeClose" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                    beforeClose: false,
                }
            },
            methods: {
                handleBeforeClose (done) {
                    done()
                    this.beforeClose = true
                },
            },
            components: {
                TmDialog,
            },
        })
        const wrapperDialog = wrapper.find(TmDialog)
        await sleep()
        wrapper.setData({ visible: false })
        await sleep()
        assert.strictEqual(wrapper.vm.beforeClose, true)
    })

    it('内部点击关闭', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmDialog v-model="visible" close-position="bottom" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                }
            },
            methods: {
            },
            components: {
                TmDialog,
            },
        })
        const wrapperDialog = wrapper.find(TmDialog)
        const wrapperClose = wrapperDialog.find(CancelBottom)
        await sleep()
        wrapperClose.trigger('click')
        await sleep(310)
        assert.strictEqual(wrapperDialog.isVisible(), false)
    })

    it('点击遮层关闭', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmDialog v-model="visible" close-on-click-modal />
                </div>
            `,
            data () {
                return {
                    visible: true,
                }
            },
            methods: {
            },
            components: {
                TmDialog,
            },
        })
        await sleep()
        const wrapperDialog = wrapper.find(TmDialog)
        const wrapperModal = wrapper.find('.tm-modal')
        assert.ok(wrapperDialog.isVisible())
        wrapperModal.trigger('click')
        await sleep(310)
        assert.ok(!wrapperDialog.isVisible())
        assert.ok(wrapperDialog.emitted('closed'))
    })

    it('点击遮层不关闭', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmDialog v-model="visible" :close-on-click-modal="false" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                }
            },
            methods: {
            },
            components: {
                TmDialog,
            },
        })
        await sleep()
        const wrapperDialog = wrapper.find(TmDialog)
        const wrapperModal = wrapper.find('.tm-modal')
        assert.ok(wrapperDialog.isVisible())
        wrapperModal.trigger('click')
        await sleep(310)
        assert.ok(wrapperDialog.isVisible())
    })

    it('渲染footer', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <tm-dialog v-model="visible">
                        <TestBasic slot="footer" />
                    </tm-dialog>
                </div>
            `,
            data () {
                return {
                    visible: false,
                }
            },
        }, {
            localVue,
        })
        const basic = wrapper.find(WorkBasic)
        assert.ok(basic.exists())
    })

  describe('closePosition', () => {
    void ['out-right', 'out-left', 'in-right', 'in-left', 'bottom', ''].forEach(item => {
      it(item || 'none', async () => {
        const wrapper = mount({
          template: `
              <div>
                  <tm-dialog v-model="visible" :close-position="closePosition">
                      <TestBasic slot="footer" />
                  </tm-dialog>
              </div>
          `,
          data () {
              return {
                  closePosition: item,
                  visible: false,
              }
          },
        }, {
            localVue,
        })
        const dom = {
          'out-right': CancelOutRight,
          'out-left': CancelOutLeft,
          'in-right': CancelInRight,
          'in-left': CancelInLeft,
          'bottom': CancelBottom,
        }
        const cancel = wrapper.find(dom[item] || CancelBottom)
        assert.strictEqual(cancel.exists(), !!item)

        const line = wrapper.find(Line)
        assert.strictEqual(line.exists(), item === 'out-right')
      })
    })
  })
})
