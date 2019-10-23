import MixinModal from 'web-ui/modal/src/main'
import TmModal from 'web-ui/modal/src/modal.tsx'
import assert from 'assert'
import { mount, createWrapper, TransitionStub } from '@vue/test-utils'
import { sleep, Mock } from '../helper'
import sinon from 'sinon'

describe('modal', () => {
    it('禁止click冒泡', async () => {
        const mockPrevent = sinon.fake()
        const mockClickBody = sinon.fake()
        const mock = new Mock(Event.prototype, 'stopPropagation', {
            value: mockPrevent,
        })
        window.addEventListener('click', mockClickBody)
        try {
            mock.replace()
            const wrapper = mount(TmModal)
            wrapper.trigger('click')
    
            assert.strictEqual(mockClickBody.callCount, 0)
            assert.strictEqual(mockPrevent.callCount, 1)
        } finally {
            mock.restore()
            window.removeEventListener('click', mockClickBody)
        }
    })

    it('禁止touchmove冒泡 && 禁止滚动', async () => {
        const mockPrevent = sinon.fake()
        const mockStop = sinon.fake()
        const mockMoveBody = sinon.fake()
        const mock1 = new Mock(Event.prototype, 'preventDefault', {
            value: mockPrevent,
        })
        const mock2 = new Mock(Event.prototype, 'stopPropagation', {
            value: mockStop,
        })
        window.addEventListener('touchmove', mockMoveBody)

        try {
            mock1.replace()
            mock2.replace()
            const wrapper = mount(TmModal)
            wrapper.trigger('touchmove')

            assert.strictEqual(mockMoveBody.callCount, 0)
            assert.strictEqual(mockPrevent.callCount, 1)
            assert.strictEqual(mockStop.callCount, 1)
            assert.ok(mockPrevent.calledBefore(mockStop))
        } finally {
            mock1.restore()
            mock2.restore()
            window.removeEventListener('touchmove', mockMoveBody)
        }

    })

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
