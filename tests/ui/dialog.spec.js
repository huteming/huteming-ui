import TmDialog from 'web-ui/dialog/src/dialog'
import assert from 'assert'
import { mount, config, TransitionStub } from '@vue/test-utils'
import { sleep } from '../helper'

config.stubs.transition = false

describe('dialog', () => {
    it('create', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmDialog v-model="visible" @open="handleOpen" @close="handleClose" />
                </div>
            `,
            data () {
                return {
                    visible: true,
                    open: false,
                    clsoe: false,
                }
            },
            methods: {
                handleOpen () {
                    this.open = true
                },
                handleClose () {
                    this.close = true
                },
            },
            components: {
                TmDialog,
            },
        })
        const wrapperDialog = wrapper.find(TmDialog)
        await sleep()
        assert.strictEqual(wrapperDialog.isVisible(), true)
        assert.strictEqual(wrapper.vm.open, true)
        wrapper.setData({ visible: false })
        await sleep()
        assert.strictEqual(wrapperDialog.isVisible(), false)
        assert.strictEqual(wrapper.vm.close, true)
    })

    it('async visible', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmDialog v-model="visible" />
                </div>
            `,
            data () {
                return {
                    visible: false,
                }
            },
            components: {
                TmDialog,
            },
        })
        const wrapperDialog = wrapper.find(TmDialog)
        await sleep()
        assert.strictEqual(wrapperDialog.isVisible(), false)
        wrapper.setData({ visible: true })
        await sleep()
        assert.strictEqual(wrapperDialog.isVisible(), true)
        const emitInput = wrapperDialog.emitted('input')
        assert.ok(emitInput)
        assert.deepStrictEqual(emitInput[0], [true])
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
                handleBeforeClose () {
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
        const wrapperClose = wrapperDialog.find('.tm-dialog-cancel')
        await sleep()
        wrapperClose.trigger('click')
        await sleep()
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
        const wrapperDialog = wrapper.find(TmDialog)
        const wrapperModal = wrapper.find('.tm-modal')
        await sleep()
        wrapperModal.trigger('click')
        await sleep()
        assert.strictEqual(wrapperDialog.isVisible(), false)
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
        const wrapperDialog = wrapper.find(TmDialog)
        const wrapperModal = wrapper.find('.tm-modal')
        await sleep()
        wrapperModal.trigger('click')
        await sleep()
        assert.strictEqual(wrapperDialog.isVisible(), true)
    })

    it('event closed', async () => {
        const wrapper = mount({
            template: `
                <div>
                    <TmDialog v-model="visible" />
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
        await sleep()
        wrapper.setData({ visible: false })
        await sleep()
        assert.ok(wrapperDialog.emitted('closed'))
    })
})
