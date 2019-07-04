import { createWrapper, config } from '@vue/test-utils'
import Message from 'web-ui/message/src/message.js'
import TmMessage from 'web-ui/message/src/message.vue'
import assert from 'assert'
import { sleep, Mock } from '../helper'
import sinon from 'sinon'

config.stubs.transition = false

describe('message', async () => {
    let wrapper

    beforeEach(() => {
        wrapper = createWrapper(document.body)
    })

    afterEach(() => {
        const el = document.querySelector('.tm-message')
        if (!el) return
        if (el.parentNode) {
            el.parentNode.removeChild(el)
        }
        if (el.__vue__) {
            el.__vue__.$destroy()
        }
    })

    afterEach(() => {
        sinon.restore()
    })

    afterAll(() => {
        const el = document.querySelector('.tm-modal')
        if (!el) return
        if (el.parentNode) {
            el.parentNode.removeChild(el)
        }
        if (el.__vue__) {
            el.__vue__.$destroy()
        }
    })

    it('禁止click冒泡', async () => {
        const mockClickBody = sinon.fake()
        window.addEventListener('click', mockClickBody)
        Message('hello')
        await sleep()
        const wrapperMessage = wrapper.find('.tm-message')
        wrapperMessage.trigger('click')
        assert.strictEqual(mockClickBody.callCount, 0)
        window.removeEventListener('click', mockClickBody)
    })

    it('禁止touchmove冒泡 && 禁止滚动', async () => {
        const mockPrevent = sinon.fake()
        const mock = new Mock(Event.prototype, 'preventDefault', {
            value: mockPrevent,
        })
        mock.replace()

        const mockMoveBody = sinon.fake()
        window.addEventListener('touchmove', mockMoveBody)
        Message('hello')
        await sleep()
        const wrapperMessage = wrapper.find('.tm-message')
        wrapperMessage.trigger('touchmove')
        assert.strictEqual(mockMoveBody.callCount, 0)
        window.removeEventListener('touchmove', mockMoveBody)
        assert.ok(mockPrevent.called)

        mock.restore()
    })

    it('create', (done) => {
        let wrapperContainer
        const title = 'a title'
        const message = 'a message'
        const options = {
            showCancelButton: true,
            closeOnClickModal: true,
        }
        Message(message, title, options)
            .then(() => {
                done(new Error('expect cancel'))
            })
            .catch(() => {
                wrapperContainer = wrapper.find('.tm-message')
                assert.ok(!wrapperContainer.exists())
                done()
            })

        sleep()
            .then(() => {
                wrapperContainer = wrapper.find('.tm-message')
                const wrapperTitle = wrapper.find('.tm-message-title')
                const wrapperSubtitle = wrapper.find('.tm-message-subtitle')
                const wrapperModal = wrapper.find('.tm-modal')
                assert.ok(wrapperContainer.isVisible())
                assert.strictEqual(wrapperTitle.text(), title)
                assert.strictEqual(wrapperSubtitle.text(), message)

                wrapperModal.trigger('click')
            })
    })

    it('alert', async () => {
        let wrapperMessage
        Message.alert('hhh')
        await sleep()
        wrapperMessage = wrapper.find('.tm-message')
        const wrapperConfirm = wrapper.find('.tm-message-footer-btn__confirm')
        const wrapperCancel = wrapper.find('.tm-message-footer-btn__cancel')
        const wrapperModal = wrapper.find('.tm-modal')

        assert.ok(wrapperMessage.exists())
        assert.ok(wrapperConfirm.exists())
        assert.ok(!wrapperCancel.exists())

        wrapperModal.trigger('click')
        await sleep()

        wrapperMessage = wrapper.find('.tm-message')
        assert.ok(wrapperMessage.exists())
    })

    it('confirm', async () => {
        Message.confirm('hhh', { closeOnClickModal: true })
        await sleep()

        const wrapperConfirm = wrapper.find('.tm-message-footer-btn__confirm')
        const wrapperCancel = wrapper.find('.tm-message-footer-btn__cancel')
        assert.ok(wrapperCancel.exists())
        assert.ok(wrapperConfirm.exists())
    })

    it('prompt', async () => {
        Message.prompt('hhh', { closeOnClickModal: true })
        await sleep()

        const wrapperInput = wrapper.find('.tm-message-field')
        const wrapperConfirm = wrapper.find('.tm-message-footer-btn__confirm')
        const wrapperCancel = wrapper.find('.tm-message-footer-btn__cancel')
        assert.ok(wrapperInput.exists())
        assert.ok(wrapperCancel.exists())
        assert.ok(wrapperConfirm.exists())
    })

    it('第一个参数是对象', () => {
        Message({
            title: 'hello',
        })
        const wrapperMessage = wrapper.find('.tm-message')
        assert.ok(wrapperMessage.exists())
    })

    it('第二个参数是对象', () => {
        Message('aaa', {
            title: 'hello',
        })
        const wrapperMessage = wrapper.find('.tm-message')
        assert.ok(wrapperMessage.exists())
    })

    it('input event', (done) => {
        const value = 'some value'
        Message({ showInput: true })
            .then(({ action, inputValue }) => {
                assert.strictEqual(action, 'confirm')
                assert.strictEqual(inputValue, value)
                done()
            })
        sleep()
            .then(() => {
                const wrapperInput = wrapper.find('.tm-message-field__input')
                const wrapperConfirm = wrapper.find('.tm-message-footer-btn__confirm')
                wrapperInput.setValue(value)
                wrapperConfirm.trigger('click')
            })
    })

    it('alert callback', (done) => {
        Message.alert('hello')
            .then(({ action, inputValue }) => {
                assert.strictEqual(action, 'confirm')
                assert.strictEqual(inputValue, '')
                done()
            })
        sleep()
            .then(() => {
                const wrapperConfirm = wrapper.find('.tm-message-footer-btn__confirm')
                wrapperConfirm.trigger('click')
            })
    })

    it('beforeCancel', (done) => {
        const onCancel = sinon.fake()
        const onClose = sinon.fake()
        function beforeCancel (done, data) {
            onCancel(data)
            done()
        }
        function beforeClose (done, data) {
            onClose(data)
            done()
        }
        Message.confirm('hello', { beforeCancel, beforeClose })
            .catch(data => {
                const { action, inputValue } = data

                assert.strictEqual(action, 'cancel')
                assert.strictEqual(inputValue, '')
                assert.strictEqual(onCancel.getCall(0).args[0], data)
                assert.strictEqual(onClose.getCall(0).args[0], data)

                const wrapperMessage = wrapper.find('.tm-message')
                assert.ok(!wrapperMessage.exists())

                done()
            })
        sleep()
            .then(() => {
                const wrapperCancel = wrapper.find('.tm-message-footer-btn__cancel')
                wrapperCancel.trigger('click')
            })
    })

    it('beforeConfirm', (done) => {
        const onConfirm = sinon.fake()
        const onClose = sinon.fake()
        function beforeConfirm (done, data) {
            onConfirm(data)
            done()
        }
        function beforeClose (done, data) {
            onClose(data)
            done()
        }
        Message.confirm('hello', { beforeConfirm, beforeClose })
            .then(data => {
                const { action, inputValue } = data

                assert.strictEqual(action, 'confirm')
                assert.strictEqual(inputValue, '')
                assert.strictEqual(onConfirm.getCall(0).args[0], data)
                assert.strictEqual(onClose.getCall(0).args[0], data)

                const wrapperMessage = wrapper.find('.tm-message')
                assert.ok(!wrapperMessage.exists())

                done()
            })
        sleep()
            .then(() => {
                const wrapperCancel = wrapper.find('.tm-message-footer-btn__confirm')
                wrapperCancel.trigger('click')
            })
    })
})
