import assert from 'assert'
import TmPropsSync from './PropSync'
import { mount } from '@vue/test-utils'

describe('PropsSync', () => {
    it('create', () => {
        const wrap = mount(TmPropsSync, {
            propsData: {
                out: 'hello',
            },
        })
        assert.strictEqual(wrap.vm.in, 'hello')
    })

    it('change outside', () => {
        const wrap = mount(TmPropsSync, {
            propsData: {
                out: 'hello',
            },
        })
        wrap.setProps({ out: 'changed' })
        assert.strictEqual(wrap.vm.in, 'changed')
    })

    it('change inside', () => {
        const wrap = mount(TmPropsSync, {
            propsData: {
                out: 'hello',
            },
        })
        wrap.setData({ in: 'changed' })
        const emit = wrap.emitted('update:out')
        assert.ok(emit)
        assert.deepStrictEqual(emit[0], ['changed'])
    })
})
