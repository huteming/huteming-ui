import MixinModal from '../src/main'
import TmModal, { __RewireAPI__ } from '../src/modal'
import assert from 'assert'
import { mount, createWrapper, TransitionStub } from '@vue/test-utils'
import { sleep, Mock, cleanDom } from 'tests/helper'
import sinon from 'sinon'

describe('modal', () => {
    let originElement
    beforeEach(() => {
        originElement = document.scrollingElement
        document.scrollingElement = { scrollTop: 55 }
    })

    it('打开后禁止body滚动', async () => {
        __RewireAPI__.__Rewire__('TransitionFade', TransitionStub)
        try {
            const wrapper = mount(TmModal, {
            })
            const stub = wrapper.find(TransitionStub)
            stub.vm.$emit('after-enter')

            assert.ok(document.body.classList.contains('tm-disabled-scroll'))
            assert.strictEqual(document.body.style.top, '-55px')
    
            stub.vm.$emit('before-leave')

            assert.ok(!document.body.classList.contains('tm-disabled-scroll'))
            assert.strictEqual(document.body.style.top, '')
        } finally {
            __RewireAPI__.__ResetDependency__('TransitionFade')
        }
    })

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
                    return this.openModal()
                },
                close () {
                    return this.closeModal()
                },
            },
        }, {
            attachToDocument: true,
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        await sleep(320)
        // 实例存在
        assert.ok(wrapperModal.exists())
        // assert.ok(wrapperModal.isVisible())
        // 但不是存在于组件内
        const _wrapperModal = wrapper.find('.tm-modal')
        assert.ok(!_wrapperModal.exists())
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
                    return this.openModal({}, this.$refs.child)
                },
                close () {
                    return this.closeModal()
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
        const click = sinon.fake()
        const beforeEnter = sinon.fake()
        const afterEnter = sinon.fake()
        const beforeLeave = sinon.fake()
        const afterLeave = sinon.fake()
        const wrapper = mount({
            template: `
                <div id="container">
                    <div ref="child"></div>
                </div>
            `,
            mixins: [MixinModal],
            methods: {
                open () {
                    return this.openModal({
                        click,
                        beforeEnter,
                        afterEnter,
                        beforeLeave,
                        afterLeave,
                    })
                },
                close () {
                    return this.closeModal()
                },
            },
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        await sleep(320)
        assert.strictEqual(beforeEnter.callCount, 1)
        assert.strictEqual(afterEnter.callCount, 1)
        wrapperModal.trigger('click')
        assert.strictEqual(click.callCount, 1)
        wrapper.vm.close()
        await sleep(320)
        assert.strictEqual(beforeLeave.callCount, 1)
        assert.strictEqual(afterLeave.callCount, 1)
    })

    it('close传入callback', async () => {
        const beforeLeave = sinon.fake()
        const afterLeave = sinon.fake()
        const wrapper = mount({
            template: `
                <div id="container">
                    <div ref="child"></div>
                </div>
            `,
            mixins: [MixinModal],
            methods: {
                open () {
                    return this.openModal()
                },
                close () {
                    return this.closeModal({
                        beforeLeave,
                        afterLeave,
                    })
                },
            },
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        wrapperModal.trigger('click')
        wrapper.vm.close()
        await sleep(350)
        assert.strictEqual(beforeLeave.callCount, 1)
        assert.strictEqual(afterLeave.callCount, 1)
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
                    return this.openModal(callbackClick, this.$refs.child)
                },
                close () {
                    return this.closeModal()
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
                    return this.openModal()
                },
                close () {
                    return this.closeModal()
                },
            },
        })
        const _vm = wrapper.vm.open()
        const wrapperModal = createWrapper(_vm)
        const oldIndex = wrapperModal.element.style.zIndex
        const _vm2 = wrapper.vm.open()
        const newIndex = wrapperModal.element.style.zIndex
        assert.strictEqual(_vm, _vm2)
        assert.strictEqual(newIndex - oldIndex, 2)
        wrapper.vm.close()
    })

    it('重复创建，不会生成新实例', async () => {
        const wrapper = mount({
            template: `
                <button>button</button>
            `,
            mixins: [MixinModal],
            methods: {
                create () {
                    return this.createModal()
                },
            },
        })
        const vm1 = wrapper.vm.create()
        const vm2 = wrapper.vm.create()
        assert.strictEqual(vm1, vm2)
    })

    afterEach(() => {
        cleanDom('.tm-modal')
        sinon.restore()
        document.scrollingElement = originElement
    })
})
