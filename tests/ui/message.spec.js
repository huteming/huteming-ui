import { createWrapper, config } from '@vue/test-utils'
import Message from 'web-ui/message/src/message.js'
import TmMessage from 'web-ui/message/src/message.vue'
import assert from 'assert'
import { sleep } from '../helper'
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
        const el = document.querySelector('.tm-modal')
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

    it('create', async () => {
        const title = 'a title'
        const message = 'a message'
        const options = {}
        Message(message, title, options)
        await sleep(320)
        const wrapperMessage = wrapper.find('.tm-message')
        const wrapperTitle = wrapper.find('.tm-message-title')
        const wrapperSubtitle = wrapper.find('.tm-message-subtitle')
        assert.ok(wrapperMessage.exists())
        assert.strictEqual(wrapperTitle.text(), title)
        assert.strictEqual(wrapperSubtitle.text(), message)
    })

    it('alert', async () => {
        let wrapperMessage
        Message.alert('hhh')
        await sleep(320)
        wrapperMessage = wrapper.find('.tm-message')
        const wrapperConfirm = wrapper.find('.tm-message-footer-btn__confirm')
        const wrapperCancel = wrapper.find('.tm-message-footer-btn__cancel')
        const wrapperModal = wrapper.find('.tm-modal')

        assert.ok(wrapperMessage.exists())
        assert.ok(wrapperConfirm.exists())
        assert.ok(!wrapperCancel.exists())

        wrapperModal.trigger('click')
        await sleep(320)

        wrapperMessage = wrapper.find('.tm-message')
        assert.ok(wrapperMessage.exists())
    })

    it('confirm', async () => {
        let wrapperMessage
        Message.confirm('hhh', { closeOnClickModal: true })
            .catch(err => {})
        await sleep(320)
        wrapperMessage = wrapper.find('.tm-message')
        const wrapperCancel = wrapper.find('.tm-message-footer-btn__cancel')
        const wrapperModal = wrapper.find('.tm-modal')

        assert.ok(wrapperCancel.exists())
        wrapperModal.trigger('click')
        await sleep(350)
        wrapperMessage = wrapper.find('.tm-message')
        assert.ok(!wrapperMessage.exists())
    })

    it('prompt', async () => {
        let wrapperMessage
        Message.prompt('hhh', { closeOnClickModal: true })
            .catch(() => {
                console.log('catch an error')
            })
        await sleep(320)

        wrapperMessage = wrapper.find('.tm-message')
        const wrapperInput = wrapper.find('.tm-message-field')
        const wrapperCancel = wrapper.find('.tm-message-footer-btn__cancel')
        const wrapperModal = wrapper.find('.tm-modal')
        assert.ok(wrapperCancel.exists())
        assert.ok(wrapperInput.exists())
        wrapperModal.trigger('click')
        await sleep(350)
        wrapperMessage = wrapper.find('.tm-message')
        assert.ok(!wrapperMessage.exists())
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
        sleep(320)
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
        sleep(320)
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
        sleep(320)
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
        sleep(320)
            .then(() => {
                const wrapperCancel = wrapper.find('.tm-message-footer-btn__confirm')
                wrapperCancel.trigger('click')
            })
    })
})
