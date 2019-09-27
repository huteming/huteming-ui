import assert from 'assert'
import TmPropSync from '../components/PropSync.vue'
import { mount } from '@vue/test-utils'

describe('PropSync', () => {
    it('create', () => {
        const wrapper = mount(TmPropSync, {
            propsData: {
                out: 'hello',
            },
        })
        assert.strictEqual(wrapper.vm.out, 'hello')
        assert.strictEqual(wrapper.vm.in, 'hello')
    })

    it('change outside', () => {
        const wrapper = mount(TmPropSync, {
            propsData: {
                out: 'hello',
            },
        })
        const wrapperIn = wrapper.find(TmPropSync)
        wrapper.setProps({
            out: 'change',
        })
        assert.strictEqual(wrapper.vm.out, 'change')
        assert.strictEqual(wrapper.vm.in, 'change')

        // 原有的监听事件
        const emitOrigin = wrapperIn.emitted('changeOut')
        assert.strictEqual(emitOrigin.length, 1)
    })

    it('change inside', () => {
        const wrapper = mount(TmPropSync, {
            propsData: {
                out: 'hello',
            },
        })
        const wrapperIn = wrapper.find(TmPropSync)
        wrapperIn.vm.in = 'uuu'
        const emitUpdate = wrapperIn.emitted('update:out')
        assert.strictEqual(emitUpdate.length, 1)
        assert.deepStrictEqual(emitUpdate[0], ['uuu'])

        // 原有的监听事件
        const emitOrigin = wrapperIn.emitted('changeIn')
        assert.strictEqual(emitOrigin.length, 1)
    })
})
