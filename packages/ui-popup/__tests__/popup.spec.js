/**
 * 由于 modal 是只会创建一个实例，所以必须在每个测试结束关闭 modal
 */
import { mount, createLocalVue, TransitionStub } from '@vue/test-utils'
import TmPopup from '../src/main'
import assert from 'assert'
import { sleep } from 'tests/helper'
import sinon from 'sinon'
import TransitionFade from 'packages/ui-transition-fade/src/main'
import TransitionSlide from 'packages/ui-transition-slide/src/main'
import { __RewireAPI__ as RewireAPI } from '../src/popup'

const localVue = createLocalVue()
localVue.use(TmPopup)

describe('popup', () => {
  afterEach(() => {
    sinon.restore()
    RewireAPI.__ResetDependency__('TransitionFade')
  })

  it('create', async () => {
    RewireAPI.__Rewire__('TransitionFade', TransitionStub)
    const wrapper = mount(TmPopup, {
      propsData: {
        value: true,
      },
    })
    await sleep()
    wrapper.find(TransitionStub).vm.$emit('after-enter')

    assert.ok(wrapper.isVisible())
    assert.ok(wrapper.emitted('open'))
    assert.ok(wrapper.emitted('opened'))
  })

  it('close', async () => {
    RewireAPI.__Rewire__('TransitionFade', TransitionStub)
    const wrap = mount(TmPopup, {
      propsData: {
        value: true,
      },
    })
    await sleep()
    wrap.setProps({ value: false })
    wrap.find(TransitionStub).vm.$emit('after-leave')
    await sleep()

    assert.ok(!wrap.isVisible())
    assert.ok(wrap.emitted('close'))
    assert.ok(wrap.emitted('closed'))
  })

    it('beforeClose', async () => {
        const onClose = sinon.fake()
        const wrapper = mount({
            template: `
                <div>
                    <TmPopup v-model="visible" :before-close="beforeClose" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                    beforeClose (done) {
                        onClose()
                        done()
                    },
                }
            },
            components: {
                TmPopup,
            },
        }, {
        })
        // await sleep()
        const wrapperPopup = wrapper.find(TmPopup)
        wrapper.setData({ visible: false })
        // await sleep()
        assert.strictEqual(onClose.callCount, 1)
    })

    it('closeOnClickModal', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmPopup v-model="visible" position="bottom" :close-on-click-modal="closeOnClickModal" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                    closeOnClickModal: false,
                }
            },
            components: {
                TmPopup,
            },
        }, {
        })
        await sleep(100)
        const wrapperModal = wrapper.find('.tm-modal')
        const wrapperPopup = wrapper.find(TmPopup)
        wrapperModal.trigger('click')
        // assert.ok(wrapperPopup.isVisible())
        wrapper.setData({ closeOnClickModal: true })
        wrapperModal.trigger('click')
        // assert.ok(!wrapperPopup.isVisible())
    })

    it('top', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmPopup v-model="visible" position="top" :duration="30" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                    closeOnClickModal: false,
                }
            },
            components: {
                TmPopup,
            },
        }, {
        })
        await sleep()
        const wrapperPopup = wrapper.find(TmPopup)
        assert.strictEqual(wrapperPopup.vm.transitionComponent, TransitionSlide)
    })

    it('bottom', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmPopup v-model="visible" position="bottom" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                }
            },
            components: {
                TmPopup,
            },
        }, {
        })
        await sleep()
        const wrapperPopup = wrapper.find(TmPopup)
        assert.strictEqual(wrapperPopup.vm.transitionComponent, TransitionSlide)
    })

    it('left', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmPopup v-model="visible" position="left" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                }
            },
            components: {
                TmPopup,
            },
        }, {
        })
        await sleep()
        const wrapperPopup = wrapper.find(TmPopup)
        assert.strictEqual(wrapperPopup.vm.transitionComponent, TransitionSlide)
    })

    it('right', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmPopup v-model="visible" position="right" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                }
            },
            components: {
                TmPopup,
            },
        }, {
        })
        await sleep()
        const wrapperPopup = wrapper.find(TmPopup)
        assert.strictEqual(wrapperPopup.vm.transitionComponent, TransitionSlide)
    })

    it('middle', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmPopup v-model="visible" position="middle" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                    closeOnClickModal: false,
                }
            },
            components: {
                TmPopup,
            },
        }, {
        })
        await sleep()
        const wrapperPopup = wrapper.find(TmPopup)
        assert.strictEqual(wrapperPopup.vm.transitionComponent, TransitionFade)
    })

    it('attrs closeOnMove', () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmPopup v-model="visible" :position="position" :close-on-move="closeOnMove" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                    position: 'left',
                    closeOnMove: 100,
                }
            },
            components: {
                TmPopup,
            },
        })
        const vm = wrapper.find(TmPopup).vm
        assert.strictEqual(vm.normalizedCloseOnMove, Infinity)

        wrapper.setData({
            position: 'bottom',
            closeOnMove: undefined,
        })
        assert.strictEqual(vm.normalizedCloseOnMove, Infinity)

        wrapper.setData({
            position: 'bottom',
            closeOnMove: false,
        })
        assert.strictEqual(vm.normalizedCloseOnMove, Infinity)

        wrapper.setData({
            position: 'bottom',
            closeOnMove: true,
        })
        assert.strictEqual(vm.normalizedCloseOnMove, 70)

        wrapper.setData({
            position: 'bottom',
            closeOnMove: 0,
        })
        assert.strictEqual(vm.normalizedCloseOnMove, Infinity)

        wrapper.setData({
            position: 'bottom',
            closeOnMove: 10,
        })
        assert.strictEqual(vm.normalizedCloseOnMove, 10)
    })

    it('event closeOnMove', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmPopup v-model="visible" position="bottom" :close-on-move="100" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                }
            },
        }, {
            localVue,
        })
        await sleep()
        const wrapperPopup = wrapper.find(TmPopup)
        // assert.ok(wrapperPopup.isVisible())
        wrapperPopup.trigger('touchstart', {
            changedTouches: [{ pageY: 10 }],
        })
        wrapperPopup.trigger('touchmove', {
            changedTouches: [{ pageY: 100 }]
        })
        await sleep(35)
        // assert.ok(wrapperPopup.isVisible())
        wrapperPopup.trigger('touchmove', {
            changedTouches: [{ pageY: 200 }]
        })
        await sleep(35)
        // assert.ok(!wrapperPopup.isVisible())
    })
})
