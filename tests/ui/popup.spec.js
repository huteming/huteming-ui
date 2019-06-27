import { mount } from '@vue/test-utils'
import TmPopup from 'web-ui/popup/src/popup'
import assert from 'assert'
import { sleep } from '../helper'
import sinon from 'sinon'

describe('popup', () => {
    let wrapper

    afterEach(() => {
        sinon.restore()
        wrapper && wrapper.destroy()
    })

    it('create', async () => {
        wrapper = mount(TmPopup, {
            attachToDocument: true,
            propsData: {
                value: true,
            },
        })
        await sleep()
        const wrapperContainer = wrapper.find('.tm-popup')
        assert.ok(wrapperContainer.isVisible())
        assert.ok(wrapper.emitted('open'))
    })

    it('close', async () => {
        wrapper = mount(TmPopup, {
            propsData: {
                value: false,
            },
            attachToDocument: true,
            stubs: {
                transition: false,
            },
        })
        const wrapperPopup = wrapper.find('.tm-popup')
        assert.ok(!wrapperPopup.isVisible())
        await sleep(400)
        wrapper.setProps({ value: true })
        await sleep(400)
        assert.ok(wrapperPopup.isVisible())
        wrapper.setProps({ value: false })
        await sleep(400)
        assert.ok(!wrapperPopup.isVisible())
        assert.ok(wrapper.emitted('close'))
        assert.ok(wrapper.emitted('closed'))
    })

    it('beforeClose', async () => {
        const onClose = sinon.fake()
        wrapper = mount(TmPopup, {
            attachToDocument: true,
            propsData: {
                value: true,
                beforeClose (done) {
                    onClose()
                    done()
                },
            },
        })
        const wrapperContainer = wrapper.find('.tm-popup')
        await sleep()
        wrapper.setProps({ value: false })
        await sleep()
        assert.strictEqual(wrapperContainer.isVisible(), false)
        assert.ok(wrapper.emitted('close'))
        assert.strictEqual(onClose.callCount, 1)
    })

    it('closeOnClickModal', async () => {
        wrapper = mount({
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
        }, { attachToDocument: true })
        const wrapperContainer = wrapper.find('.tm-popup')
        const wrapperModal = wrapper.find('.tm-modal')
        const wrapperPopup = wrapper.find(TmPopup)
        await sleep()
        assert.strictEqual(wrapperContainer.isVisible(), true)
        wrapperPopup.setProps({ closeOnClickModal: false })
        wrapperModal.trigger('click')
        await sleep()
        assert.strictEqual(wrapperContainer.isVisible(), true)
        wrapperPopup.setProps({ closeOnClickModal: true })
        wrapperModal.trigger('click')
        await sleep()
        assert.strictEqual(wrapperContainer.isVisible(), false)
    })

    it('duration', async () => {
        wrapper = mount(TmPopup, {
            attachToDocument: true,
            propsData: {
                value: true,
                position: 'top',
                duration: 500,
            },
        })
        const wrapperContainer = wrapper.find('.tm-popup')
        await sleep()
        assert.ok(wrapperContainer.isVisible())
        await sleep(500)
        assert.strictEqual(wrapperContainer.isVisible(), false)
    })

    it('top', async () => {
        wrapper = mount(TmPopup, {
            attachToDocument: true,
            propsData: {
                value: true,
                position: 'top',
            },
        })
        assert.strictEqual(wrapper.vm.transition, 'popup-slide-top')
    })

    it('bottom', async () => {
        wrapper = mount(TmPopup, {
            attachToDocument: true,
            propsData: {
                value: true,
                position: 'bottom',
            },
        })
        assert.strictEqual(wrapper.vm.transition, 'popup-slide-bottom')
    })

    it('left', async () => {
        wrapper = mount(TmPopup, {
            attachToDocument: true,
            propsData: {
                value: true,
                position: 'left',
            },
        })
        assert.strictEqual(wrapper.vm.transition, 'popup-slide-left')
    })

    it('right', async () => {
        wrapper = mount(TmPopup, {
            attachToDocument: true,
            propsData: {
                value: true,
                position: 'right',
            },
        })
        assert.strictEqual(wrapper.vm.transition, 'popup-slide-right')
    })

    it('middle', async () => {
        wrapper = mount(TmPopup, {
            attachToDocument: true,
            propsData: {
                value: true,
                position: 'middle',
            },
        })
        assert.strictEqual(wrapper.vm.transition, 'popup-fade')
    })
})
