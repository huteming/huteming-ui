import MixinModal from 'web-ui/modal/src/modal.js'
import TmModal from 'web-ui/modal/src/modal.vue'
import assert from 'assert'
import { mount, createWrapper, TransitionStub } from '@vue/test-utils'
import { sleep } from '../helper'
import sinon from 'sinon'

describe('modal', () => {
    let wrapper

    afterEach(() => {
        wrapper && wrapper.destroy()
    })

    it('create', async () => {
        wrapper = mount({
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
            stubs: {
                transition: false,
            },
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        assert.ok(wrapperModal.exists())
        wrapper.vm.close()
        await sleep(350)
        assert.ok(!wrapperModal.exists())
    })

    it('has brotherElement', async () => {
        wrapper = mount({
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
        }, {
            attachToDocument: true,
            stubs: {
                transition: false,
            },
        })
        wrapper.vm.open()
        const wrapperModal = wrapper.find('.tm-modal')
        assert.ok(wrapperModal.exists())
        wrapper.destroy()
    })

    it('挂载到body', async () => {
        wrapper = mount({
            template: `
                <div id="container">
                    <div ref="child"></div>
                </div>
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
            // attachToDocument: true,
            stubs: {
                transition: false,
            },
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = wrapper.find('.tm-modal')
        assert.ok(!wrapperModal.exists())
        createWrapper(_vm).destroy()
    })

    it('open传入callback', async () => {
        const callbackClick = sinon.fake()
        const callbackBeforeEnter = sinon.fake()
        const callbackAfterEnter = sinon.fake()
        const callbackBeforeLeave = sinon.fake()
        const callbackAfterLeave = sinon.fake()
        wrapper = mount({
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
        }, {
            attachToDocument: true,
            stubs: {
                transition: false,
            },
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        await sleep(350)
        assert.strictEqual(callbackBeforeEnter.callCount, 1)
        assert.strictEqual(callbackAfterEnter.callCount, 1)
        wrapperModal.trigger('click')
        assert.strictEqual(callbackClick.callCount, 1)
        wrapper.vm.close()
        await sleep(350)
        assert.strictEqual(callbackBeforeLeave.callCount, 1)
        assert.strictEqual(callbackAfterLeave.callCount, 1)
    })

    it('close传入callback', async () => {
        const callbackClick = sinon.fake()
        const callbackBeforeLeave = sinon.fake()
        const callbackAfterLeave = sinon.fake()
        wrapper = mount({
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
        }, {
            attachToDocument: true,
            stubs: {
                transition: false,
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
        wrapper = mount({
            template: `
                <div id="container">
                    <div ref="child"></div>
                </div>
            `,
            mixins: [MixinModal],
            methods: {
                open () {
                    return this.$_openModal(callbackClick)
                },
                close () {
                    return this.$_closeModal()
                },
            },
        }, {
            attachToDocument: true,
            stubs: {
                transition: false,
            },
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        wrapperModal.trigger('click')
        assert.strictEqual(callbackClick.callCount, 1)
    })

    it('close id 不存在', async () => {
        wrapper = mount({
            template: `
                <div id="container">
                    <div ref="child"></div>
                </div>
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
            stubs: {
                transition: false,
            },
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        wrapper.vm.modalID = -1
        wrapper.vm.close()
        await sleep(350)
        assert.ok(wrapperModal.exists())
    })

    it('多次打开', async () => {
        wrapper = mount({
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
            stubs: {
                transition: false,
            },
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        const oldIndex = wrapperModal.vm.zIndex
        const _vm2 = wrapper.vm.open()
        const newIndex = wrapperModal.vm.zIndex
        assert.strictEqual(_vm, _vm2)
        assert.strictEqual(newIndex - oldIndex, 1)
    })
})
