import { createWrapper } from '@vue/test-utils'
import assert from 'assert'
import Toast from '../src/main'
import { sleep } from 'tests/helper'
import sinon from 'sinon'
import Vue from 'vue'
import TestBasis from 'tests/components/basic.vue'

describe('toast', () => {
    it('create', async () => {
        const msg = 'hello world'
        const vm = Toast(msg)
        const wrapper = createWrapper(vm)
        await sleep()
        const wrapperContent = wrapper.find('.tm-toast__text')
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
        assert.strictEqual(vm.icon, 'success_circle_outline')
    })

    it('error', async () => {
        const vm = Toast.error('msg')
        assert.strictEqual(vm.icon, 'error_circle_outline')
    })

    it('warning', async () => {
        const vm = Toast.warning('msg')
        assert.strictEqual(vm.icon, 'warning_circle_outline')
    })

    it('loading', async () => {
        const vm = Toast.loading('ll')
        assert.strictEqual(vm.icon, 'loading')
        assert.strictEqual(vm.duration, 0)
    })

    it('第一个参数为对象', async () => {
        const message = 'message'
        const vm = Toast({
            message,
        })
        const wrapper = createWrapper(vm)
        await sleep()
        const wrapperContent = wrapper.find('.tm-toast__text')
        assert.strictEqual(wrapperContent.text(), message)
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

    it('destroy', async () => {
        const onClose = sinon.fake()
        const vm = Toast('destroy', 500, { onClose })
        const wrapper = createWrapper(vm)
        await sleep()
        assert.strictEqual(wrapper.exists(), true)
        await sleep(1000)
        assert.strictEqual(wrapper.exists(), false)
        assert.strictEqual(onClose.callCount, 1)
    })

    it('duration 为 0 不会销毁', async () => {
        const onClose = sinon.fake()
        const vm = Toast('destroy', 0, { onClose })
        const wrapper = createWrapper(vm)
        await sleep()
        assert.strictEqual(wrapper.exists(), true)
        await sleep(1000)
        assert.strictEqual(wrapper.exists(), true)
        assert.strictEqual(onClose.callCount, 0)
    })

    it('zindex递增', async () => {
        const vm1 = Toast('first')
        await sleep()
        const vm2 = Toast('second')
        await sleep()
        assert.strictEqual(vm2.zIndex - vm1.zIndex, 1)
    })

    it('position', async () => {
        const positions = ['top', 'middle', 'bottom']
        positions.forEach(position => {
            const vm = Toast('qq', { position })
            assert.strictEqual(vm.position, position)
        })
    })

    it('只有图标', async () => {
        const vm = Toast.success()
        const wrap = createWrapper(vm)
        const text = wrap.find('.tm-toast__text')
        const icon = wrap.find('.tm-toast__icon')
        assert.ok(!text.exists())
        assert.ok(icon.exists())
    })

    it('message是VNode类型', () => {
        const ins = new Vue()
        const h = ins.$createElement
        const vnode = h(TestBasis)
        const vm = Toast(vnode)
        const wrap = createWrapper(vm)
        const text = wrap.find('.tm-toast__text')
        assert.ok(text.contains(TestBasis))
    })

    it('message是组件选项ComponentOptions类型', () => {
        const vm = Toast(TestBasis)
        const wrap = createWrapper(vm)
        const text = wrap.find('.tm-toast__text')
        assert.ok(text.contains(TestBasis))
    })
})
