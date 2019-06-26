import { createWrapper, mount, shallowMount } from '@vue/test-utils'
import assert from 'assert'
import Toast from 'web-ui/toast/src/toast.js'
import TmToast from 'web-ui/toast/src/toast.vue'
import { sleep } from '../helper'
import sinon from 'sinon'
import WorkBasic from '../components/basic.vue'

describe('toast', () => {
    it('create', async () => {
        const msg = 'hello world'
        const vm = Toast(msg)
        const wrapper = createWrapper(vm)
        await sleep()
        const wrapperContent = wrapper.find('.tm-toast-content')
        assert.strictEqual(wrapperContent.text(), msg)
    })

    it('渲染最后一次调用参数', async () => {
        const vm1 = Toast('start')
        const vm2 = Toast('end')
        await sleep()
        assert.strictEqual(vm1.visible, false)
        assert.strictEqual(vm2.visible, true)
    })

    it('success', async () => {
        const vm = Toast.success('start')
        assert.strictEqual(vm.icon, 'success')
    })

    it('error', async () => {
        const vm = Toast.error('msg')
        assert.strictEqual(vm.icon, 'error')
    })

    it('warning', async () => {
        const vm = Toast.warning('msg')
        assert.strictEqual(vm.icon, 'warning')
    })

    it('loading', async () => {
        const vm = Toast.loading('ll')
        assert.strictEqual(vm.icon, 'loading')
        assert.strictEqual(vm.duration, 0)
    })

    it('第二个参数为对象', () => {
        const icon = 'icon'
        const vm = Toast('hhh', {
            icon,
            duration: 1000,
        })
        assert.strictEqual(vm.icon, icon)
        assert.strictEqual(vm.duration, 1000)
    })

    it('第三个参数为对象', () => {
        const icon = 'icon'
        const vm = Toast('jjj', 1500, {
            icon,
        })
        assert.strictEqual(vm.icon, icon)
        assert.strictEqual(vm.duration, 1500)
    })
})
