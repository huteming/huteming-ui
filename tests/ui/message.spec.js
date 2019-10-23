import { createWrapper, config } from '@vue/test-utils'
import Message from 'web-ui/message/src/main'
import assert from 'assert'
import { sleep, Mock } from '../helper'
import sinon from 'sinon'
import CompBasis from '../components/basic.vue'
import Vue from 'vue'

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

    it('渲染title,message区域', async () => {
        let wrapperContainer
        const title = 'a title'
        const message = 'a message'
        Message(message, title)

        await sleep()
        wrapperContainer = wrapper.find('.tm-message')
        const wrapperTitle = wrapper.find('.tm-message-title')
        const wrapperSubtitle = wrapper.find('.tm-message-subtitle')
        assert.ok(wrapperContainer.isVisible())
        assert.strictEqual(wrapperTitle.text(), title)
        assert.strictEqual(wrapperSubtitle.text(), message)
    })

    it('只显示message,没有title', async () => {
        const message = 'a message'
        Message(message, '')

        await sleep()
        const wrapperContainer = wrapper.find('.tm-message')
        const wrapperTitle = wrapper.find('.tm-message-title')
        const wrapperSubtitle = wrapper.find('.tm-message-subtitle')
        assert.ok(wrapperContainer.isVisible())
        assert.ok(!wrapperTitle.exists())
        assert.strictEqual(wrapperSubtitle.text(), message)
    })

    it('点击模态框消失', (done) => {
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
                const wrapperContainer = wrapper.find('.tm-message')
                assert.ok(!wrapperContainer.exists())
                done()
            })

        sleep()
            .then(() => {
                const wrapperContainer = wrapper.find('.tm-message')
                const wrapperTitle = wrapper.find('.tm-message-title')
                const wrapperSubtitle = wrapper.find('.tm-message-subtitle')
                assert.ok(wrapperContainer.isVisible())
                assert.strictEqual(wrapperTitle.text(), title)
                assert.strictEqual(wrapperSubtitle.text(), message)

                wrapperContainer.trigger('click')
            })
    })

    it('点击确认按钮消失', (done) => {
        Message.alert('hello', { confirmButtonHighlight: true })
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

    it('点击取消按钮消失', (done) => {
        Message.confirm('hello', { cancelButtonHighlight: true })
            .catch(({ action, inputValue }) => {
                assert.strictEqual(action, 'cancel')
                assert.strictEqual(inputValue, '')
                done()
            })
        sleep()
            .then(() => {
                const wrapperCancel = wrapper.find('.tm-message-footer-btn__cancel')
                wrapperCancel.trigger('click')
            })
    })

    it('alert没有取消按钮', async () => {
        let wrapperMessage
        Message.alert('hhh')
        await sleep()
        wrapperMessage = wrapper.find('.tm-message')
        const wrapperConfirm = wrapper.find('.tm-message-footer-btn__confirm')
        const wrapperCancel = wrapper.find('.tm-message-footer-btn__cancel')

        assert.ok(wrapperMessage.exists())
        assert.ok(wrapperConfirm.exists())
        assert.ok(!wrapperCancel.exists())
    })

    it('alert点击模态框不消失', async () => {
        let wrapperMessage
        Message.alert('hhh')
        await sleep()
        wrapperMessage = wrapper.find('.tm-message')

        wrapperMessage.trigger('click')
        await sleep()

        wrapperMessage = wrapper.find('.tm-message')
        assert.ok(wrapperMessage.exists())
    })

    it('confirm渲染取消按钮', async () => {
        Message.confirm('hhh')
        await sleep()

        const wrapperConfirm = wrapper.find('.tm-message-footer-btn__confirm')
        const wrapperCancel = wrapper.find('.tm-message-footer-btn__cancel')
        assert.ok(wrapperCancel.exists())
        assert.ok(wrapperConfirm.exists())
    })

    it('prompt渲染输入框和取消按钮', async () => {
        Message.prompt('hhh', { closeOnClickModal: true })
        await sleep()

        const wrapperInput = wrapper.find('.tm-message-field')
        const wrapperConfirm = wrapper.find('.tm-message-footer-btn__confirm')
        const wrapperCancel = wrapper.find('.tm-message-footer-btn__cancel')
        assert.ok(wrapperInput.exists())
        assert.ok(wrapperCancel.exists())
        assert.ok(wrapperConfirm.exists())
    })

    it('第一个参数支持对象类型', async () => {
        Message({
            title: 'hello',
            message: 'world',
        })
        await sleep()
        const wrapperContainer = wrapper.find('.tm-message')
        const wrapperTitle = wrapper.find('.tm-message-title')
        const wrapperSubtitle = wrapper.find('.tm-message-subtitle')

        assert.ok(wrapperContainer.isVisible())
        assert.strictEqual(wrapperTitle.text(), 'hello')
        assert.strictEqual(wrapperSubtitle.text(), 'world')
    })

    it('第一个参数支持VNode类型', async () => {
        const ins = new Vue()
        const h = ins.$createElement
        const vnode = h(CompBasis)
        Message(vnode)
        await sleep()
        const wrapperContainer = wrapper.find('.tm-message')
        const wrapperTitle = wrapper.find('.tm-message-title')
        const wrapperSubtitle = wrapper.find('.uniqueClass')

        assert.ok(wrapperContainer.isVisible())
        assert.strictEqual(wrapperTitle.text(), '提示')
        assert.ok(wrapperSubtitle.exists())
    })

    it('第一个参数支持组件选项对象', async () => {
        Message(CompBasis)
        await sleep()
        const wrapperContainer = wrapper.find('.tm-message')
        const wrapperTitle = wrapper.find('.tm-message-title')
        const wrapperSubtitle = wrapper.find('.uniqueClass')

        assert.ok(wrapperContainer.isVisible())
        assert.strictEqual(wrapperTitle.text(), '提示')
        assert.ok(wrapperSubtitle.exists())
    })

    it('第二个参数支持对象类型', async () => {
        Message('aaa', {
            title: 'hello',
        })
        await sleep()
        const wrapperContainer = wrapper.find('.tm-message')
        const wrapperTitle = wrapper.find('.tm-message-title')
        const wrapperSubtitle = wrapper.find('.tm-message-subtitle')

        assert.ok(wrapperContainer.isVisible())
        assert.strictEqual(wrapperTitle.text(), 'hello')
        assert.strictEqual(wrapperSubtitle.text(), 'aaa')
    })

    it('返回对象中带有输入框值', (done) => {
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

    it('非配置属性不会添加到实例中', (done) => {
        Message.confirm({
            title: 'a',
            message: 'b',
            other: 'other',
            closeOnClickModal: true,
        })
            .catch(({ vm }) => {
                assert.strictEqual(vm.other, undefined)
                done()
            })

        sleep()
            .then(() => {
                const wrapperMessage = wrapper.find('.tm-message')
                wrapperMessage.trigger('click')
            })
    })
})
