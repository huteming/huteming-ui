import MixinModal from 'web-ui/modal/src/modal.js'
import TmModal from 'web-ui/modal/src/modal.vue'
import assert from 'assert'
import { mount, createWrapper, TransitionStub } from '@vue/test-utils'
import { sleep } from '../helper'
import sinon from 'sinon'

describe('modal', () => {
    it('create', async () => {
        const wrapper = mount({
            template: `
                <button @click="open">button</button>
            `,
            mixins: [MixinModal],
            methods: {
                open () {
                    return this.$_openModal()
                },
                close () {
                    return this.$_closeModal()
                },
            },
        }, {
            attachToDocument: true,
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        // 实例存在
        assert.ok(wrapperModal.exists())
        assert.ok(wrapperModal.isVisible())
        // 但不是存在于组件内
        const _wrapperModal = wrapper.find('.tm-modal')
        assert.ok(!_wrapperModal.exists())
        wrapper.vm.close()
        await sleep(320)
        assert.ok(!wrapperModal.exists())
    })

    it('has brotherElement', async () => {
        const wrapper = mount({
            template: `
                <div id="container">
                    <div ref="child"></div>
                </div>
            `,
            mixins: [MixinModal],
            methods: {
                open () {
                    return this.$_openModal({}, this.$refs.child)
                },
                close () {
                    return this.$_closeModal()
                },
            },
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        assert.ok(wrapperModal.exists())
        assert.ok(wrapperModal.isVisible())
        wrapper.vm.close()
    })

    it('open传入callback', async () => {
        const callbackClick = sinon.fake()
        const callbackBeforeEnter = sinon.fake()
        const callbackAfterEnter = sinon.fake()
        const callbackBeforeLeave = sinon.fake()
        const callbackAfterLeave = sinon.fake()
        const wrapper = mount({
            template: `
                <div id="container">
                    <div ref="child"></div>
                </div>
            `,
            mixins: [MixinModal],
            methods: {
                open () {
                    return this.$_openModal({
                        callbackClick,
                        callbackBeforeEnter,
                        callbackAfterEnter,
                        callbackBeforeLeave,
                        callbackAfterLeave,
                    }, this.$refs.child)
                },
                close () {
                    return this.$_closeModal()
                },
            },
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        await sleep(320)
        assert.strictEqual(callbackBeforeEnter.callCount, 1)
        assert.strictEqual(callbackAfterEnter.callCount, 1)
        wrapperModal.trigger('click')
        assert.strictEqual(callbackClick.callCount, 1)
        wrapper.vm.close()
        await sleep(320)
        assert.strictEqual(callbackBeforeLeave.callCount, 1)
        assert.strictEqual(callbackAfterLeave.callCount, 1)
    })

    it('close传入callback', async () => {
        const callbackClick = sinon.fake()
        const callbackBeforeLeave = sinon.fake()
        const callbackAfterLeave = sinon.fake()
        const wrapper = mount({
            template: `
                <div id="container">
                    <div ref="child"></div>
                </div>
            `,
            mixins: [MixinModal],
            methods: {
                open () {
                    return this.$_openModal({}, this.$refs.child)
                },
                close () {
                    return this.$_closeModal({
                        callbackBeforeLeave,
                        callbackAfterLeave,
                    })
                },
            },
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        wrapperModal.trigger('click')
        assert.strictEqual(callbackClick.callCount, 0)
        wrapper.vm.close()
        await sleep(350)
        assert.strictEqual(callbackBeforeLeave.callCount, 1)
        assert.strictEqual(callbackAfterLeave.callCount, 1)
    })

    it('options is function', async () => {
        const callbackClick = sinon.fake()
        const wrapper = mount({
            template: `
                <div id="container">
                    <div ref="child"></div>
                </div>
            `,
            mixins: [MixinModal],
            methods: {
                open () {
                    return this.$_openModal(callbackClick, this.$refs.child)
                },
                close () {
                    return this.$_closeModal()
                },
            },
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        wrapperModal.trigger('click')
        assert.strictEqual(callbackClick.callCount, 1)
        wrapper.vm.close()
    })

    it('多次打开', async () => {
        const wrapper = mount({
            template: `
                <button @click="open">button</button>
            `,
            mixins: [MixinModal],
            methods: {
                open () {
                    return this.$_openModal({}, this.$refs.child)
                },
                close () {
                    return this.$_closeModal()
                },
            },
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        const oldIndex = wrapperModal.vm.zIndex
        const _vm2 = wrapper.vm.open()
        const newIndex = wrapperModal.vm.zIndex
        assert.strictEqual(_vm, _vm2)
        assert.strictEqual(newIndex - oldIndex, 1)
        wrapper.vm.close()
    })
})
